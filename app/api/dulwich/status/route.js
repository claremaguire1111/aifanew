import { NextResponse } from 'next/server';
import { handleOptionsRequest, corsResponse, corsErrorResponse } from '../../cors-fix';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Export config to specify allowed methods
export const config = {
  api: {
    responseLimit: false,
  },
  runtime: 'edge', // Use edge runtime for better performance
};

// Handle OPTIONS requests for CORS preflight
export function OPTIONS() {
  return handleOptionsRequest();
}

// This checks the status of a task - compatible with Vercel
export async function GET(req) {
  console.log('GET request received to check task status');
  
  // Log request details for debugging
  console.log('Request method:', req.method);
  console.log('Request headers:', JSON.stringify(Object.fromEntries([...req.headers.entries()])));
  
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get('taskId');
    
    if (!taskId) {
      return corsErrorResponse("Missing taskId parameter", 400);
    }
    
    // The hardcoded key that's known to work (fallback)
    const FALLBACK_API_KEY = process.env.RUNWAY_API_KEY || "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";
    
    // Define API endpoints to try for task status
    const apiEndpoints = [
      `https://api.dev.runwayml.com/v1/tasks/${taskId}`,  // Try dev endpoint
      `https://api.runwayml.com/v1/tasks/${taskId}`       // Try production endpoint
    ];
    
    // These version headers should be tried in order
    const versionHeaders = [
      null,         // No version header
      'latest',     // Latest version
      '2023-09-26', // Known working version
      '2023-11-06', // Older version
      '2024-11-06', // From documentation
    ];
    
    let lastError = null;
    let statusData = null;
    
    // Try combinations of endpoints and version headers
    for (const endpoint of apiEndpoints) {
      if (statusData) break; // Stop if we already have a successful result
      
      for (const version of versionHeaders) {
        if (statusData) break; // Stop if we already have a successful result
        
        console.log(`Checking ${endpoint} with${version ? ' version ' + version : ' no version header'}`);
        
        const headers = {
          'Authorization': `Bearer ${FALLBACK_API_KEY}`,
          'Content-Type': 'application/json'
        };
        
        if (version) {
          headers['X-Runway-Version'] = version;
        }
        
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: headers
          });
          
          console.log(`Response from ${endpoint} (${version || 'no version'}): ${response.status}`);
          
          if (response.ok) {
            const responseData = await response.json();
            console.log('Task status retrieved successfully:', responseData.status);
            statusData = responseData;
            break;
          } else {
            const errorText = await response.text();
            console.log(`Error from ${endpoint} (${version || 'no version'}): ${response.status} - ${errorText.substring(0, 100)}`);
            lastError = new Error(`API error: ${response.status} - ${errorText.substring(0, 200)}`);
          }
        } catch (error) {
          console.error(`Request error from ${endpoint} (${version || 'no version'}):`, error.message);
          lastError = error;
        }
      }
    }
    
    if (statusData) {
      // Successfully got status
      if (statusData.status === 'SUCCEEDED') {
        return corsResponse({
          success: true,
          status: statusData.status,
          output: statusData.output
        });
      } else if (statusData.status === 'FAILED') {
        return corsErrorResponse(
          statusData.error || 'Task failed',
          200,
          {
            status: statusData.status,
            demoUrl: '/videos/demo.mp4', // Provide a fallback demo URL
            isDemo: true
          }
        );
      } else {
        // Still processing
        return corsResponse({
          success: true,
          status: statusData.status
        });
      }
    } else {
      // All attempts failed - return a more useful error message
      const errorMsg = lastError?.message || 'All API attempts failed';
      console.error("Failed to get task status:", errorMsg);
      return corsErrorResponse(
        errorMsg,
        500,
        {
          status: 'FAILED',
          message: 'Failed to check task status after trying all API approaches',
          demoUrl: '/videos/demo.mp4', // Provide a fallback demo URL
          isDemo: true
        }
      );
    }
  } catch (error) {
    console.error("Error checking task status:", error);
    return corsErrorResponse(
      error.message || 'Unknown error occurred',
      500,
      {
        status: 'FAILED',
        demoUrl: '/videos/demo.mp4', // Provide a fallback demo URL
        isDemo: true
      }
    );
  }
}