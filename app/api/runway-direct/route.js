import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Explicitly define the allowed HTTP methods for Vercel
export const runtime = 'nodejs';

// Configure allowed request methods
export const allowedMethods = ['GET', 'POST', 'OPTIONS'];

// Helper function to handle method validation
const methodNotAllowed = () => {
  return new NextResponse(
    JSON.stringify({ error: 'Method Not Allowed' }),
    { 
      status: 405, 
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    }
  );
};

// The hardcoded key that's known to work
const FALLBACK_API_KEY = "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";

// Helper function to make API requests with different auth methods
async function makeRunwayRequest(url, httpMethod, headers, body = null) {
  // Try multiple authentication methods
  const authMethods = [
    // Method 1: Bearer token with environment key
    {
      name: 'env_bearer',
      headers: {
        ...headers,
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY || ''}`
      }
    },
    // Method 2: Bearer token with fallback key
    {
      name: 'fallback_bearer',
      headers: {
        ...headers,
        'Authorization': `Bearer ${FALLBACK_API_KEY}`
      }
    },
    // Method 3: Direct key without Bearer (some APIs prefer this)
    {
      name: 'fallback_direct',
      headers: {
        ...headers,
        'Authorization': FALLBACK_API_KEY
      }
    }
  ];
  
  // Try each auth method until one works
  let lastError = null;
  let lastResponse = null;
  
  for (const method of authMethods) {
    try {
      console.log(`Trying API request with auth method: ${method.name}`);
      
      const response = await fetch(url, {
        method: httpMethod, // Use the HTTP method provided as a parameter
        headers: method.headers,
        body: body ? JSON.stringify(body) : undefined
      });
      
      lastResponse = response;
      
      console.log(`Auth method ${method.name} returned status: ${response.status}`);
      
      // If successful, return the response
      if (response.ok) {
        console.log(`Auth method ${method.name} succeeded!`);
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = { rawText: text };
        }
        return { success: true, data, status: response.status };
      }
    } catch (error) {
      lastError = error;
      console.error(`Auth method ${method.name} failed with error:`, error.message);
    }
  }
  
  // If all methods failed, return the last error or response
  if (lastResponse) {
    try {
      const text = await lastResponse.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = { rawText: text };
      }
      return { success: false, data, status: lastResponse.status };
    } catch (e) {
      return { success: false, error: 'Failed to read response', status: lastResponse.status };
    }
  }
  
  return { success: false, error: lastError?.message || 'All authentication methods failed' };
}

// Direct integration with RunwayML API based on official documentation
// Use export const to ensure proper declaration of API route handlers in Vercel
export const POST = async (req) => {
  console.log('POST request received to runway-direct endpoint');
  
  // Check if method is allowed
  if (req.method !== 'POST') {
    console.error(`Method ${req.method} not allowed, expected POST`);
    return methodNotAllowed();
  }
  
  try {
    // Parse the request body
    const requestData = await req.json();
    console.log('Received payload structure:', Object.keys(requestData));
    
    // Extract the necessary data from the request
    const { base64Image, promptText, model = "gen4_turbo", ratio = "1280:720", duration = 5 } = requestData;
    
    if (!base64Image || !promptText) {
      return NextResponse.json({ 
        error: "Missing required parameters", 
        message: "Both base64Image and promptText are required" 
      }, { status: 400 });
    }
    
    // Define API endpoints to try
    const apiEndpoints = [
      'https://api.dev.runwayml.com/v1/image_to_video',  // Primary (new) endpoint
      'https://api.runwayml.com/v1/image_to_video'       // Fallback (old) endpoint
    ];
    
    // Define payload formats to try
    const payloadFormats = [
      // Flat structure format
      {
        name: 'flat',
        payload: {
          model: model,
          promptImage: base64Image,
          promptText: promptText,
          ratio: ratio,
          duration: duration
        }
      },
      // Nested structure format
      {
        name: 'nested',
        payload: {
          model: model,
          input: {
            promptImage: base64Image,
            promptText: promptText
          },
          parameters: {
            ratio: ratio,
            duration: duration
          }
        }
      }
    ];
    
    // Try different combinations of endpoints and payload formats
    let result = { success: false };
    let attemptCount = 0;
    
    for (const endpoint of apiEndpoints) {
      for (const format of payloadFormats) {
        if (result.success) break; // Stop if we already have a successful result
        
        attemptCount++;
        console.log(`Attempt ${attemptCount}: Making request to ${endpoint} with ${format.name} structure`);
        
        try {
          const attemptResult = await makeRunwayRequest(
            endpoint,
            'POST',
            {
              'Content-Type': 'application/json',
              'X-Runway-Version': '2024-11-06'  // Required per docs
            },
            format.payload
          );
          
          console.log(`Attempt ${attemptCount} result:`, attemptResult.success ? 'SUCCESS' : 'FAILED');
          
          if (attemptResult.success) {
            console.log(`Successful with endpoint ${endpoint} and ${format.name} format`);
            result = attemptResult;
            break;
          }
        } catch (error) {
          console.error(`Attempt ${attemptCount} error:`, error.message);
        }
      }
      
      if (result.success) break; // Stop trying endpoints if we found a working combination
    }
    
    console.log('API request result:', result.success ? 'SUCCESS' : 'FAILED');
    
    // Return the result with appropriate status
    return NextResponse.json(result.data, { 
      status: result.status || (result.success ? 200 : 500),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error("RunwayML direct API error:", error.message);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
}

// Check task status endpoint
export const GET = async (req) => {
  console.log('GET request received to check task status');
  
  // Check if method is allowed
  if (req.method !== 'GET') {
    console.error(`Method ${req.method} not allowed, expected GET`);
    return methodNotAllowed();
  }
  
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get('taskId');
    
    if (!taskId) {
      return NextResponse.json({ 
        error: "Missing taskId parameter" 
      }, { status: 400 });
    }
    
    // Define API endpoints to try for task status
    const apiEndpoints = [
      `https://api.dev.runwayml.com/v1/tasks/${taskId}`,  // Primary (new) endpoint
      `https://api.runwayml.com/v1/tasks/${taskId}`       // Fallback (old) endpoint
    ];
    
    // Try different endpoints for task status
    let result = { success: false };
    
    for (const endpoint of apiEndpoints) {
      if (result.success) break; // Stop if we already have a successful result
      
      console.log(`Checking task status at endpoint: ${endpoint}`);
      
      try {
        const statusResult = await makeRunwayRequest(
          endpoint,
          'GET',
          {
            'Content-Type': 'application/json',
            'X-Runway-Version': '2024-11-06'  // Required per docs
          }
        );
        
        if (statusResult.success) {
          console.log(`Successfully retrieved task status from ${endpoint}`);
          result = statusResult;
          break;
        }
      } catch (error) {
        console.error(`Error checking task status at ${endpoint}:`, error.message);
      }
    }
    
    console.log(`Task status check for ${taskId}, success:`, result.success);
    
    // Return the result with appropriate status
    return NextResponse.json(result.data, { 
      status: result.status || (result.success ? 200 : 500),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error("Error checking task status:", error.message);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
}

// Handle OPTIONS preflight requests
export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204, // No content
    headers: {
      'Allow': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours cache for preflight requests
    },
  });
}