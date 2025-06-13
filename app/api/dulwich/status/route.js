import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// This checks the status of a task - compatible with Vercel
export async function GET(req) {
  console.log('GET request received to check task status');
  
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get('taskId');
    
    if (!taskId) {
      return NextResponse.json({ error: "Missing taskId parameter" }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
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
        return NextResponse.json({
          success: true,
          status: statusData.status,
          output: statusData.output
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        });
      } else if (statusData.status === 'FAILED') {
        return NextResponse.json({
          success: false,
          status: statusData.status,
          error: statusData.error || 'Task failed',
          demoUrl: '/videos/demo.mp4', // Provide a fallback demo URL
          isDemo: true
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        });
      } else {
        // Still processing
        return NextResponse.json({
          success: true,
          status: statusData.status
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        });
      }
    } else {
      // All attempts failed - return a more useful error message
      const errorMsg = lastError?.message || 'All API attempts failed';
      console.error("Failed to get task status:", errorMsg);
      return NextResponse.json({
        success: false,
        status: 'FAILED',
        error: errorMsg,
        message: 'Failed to check task status after trying all API approaches',
        demoUrl: '/videos/demo.mp4', // Provide a fallback demo URL
        isDemo: true
      }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }
  } catch (error) {
    console.error("Error checking task status:", error);
    return NextResponse.json({
      success: false,
      status: 'FAILED',
      error: error.message || 'Unknown error occurred',
      demoUrl: '/videos/demo.mp4', // Provide a fallback demo URL
      isDemo: true
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }
}

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204, // No content
    headers: {
      'Allow': 'GET, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400', // 24 hours cache for preflight requests
    },
  });
}