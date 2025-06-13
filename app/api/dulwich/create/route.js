import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Export config to specify allowed methods
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: false,
  },
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// This creates a task but doesn't wait for it to complete - compatible with Vercel
export async function POST(req) {
  console.log('POST request received to create animation task');
  
  // Log request details for debugging
  console.log('Request method:', req.method);
  console.log('Request headers:', JSON.stringify(Object.fromEntries([...req.headers.entries()])));
  
  try {
    // Extract the necessary data from the request
    const data = await req.json();
    const { base64Image, promptText } = data;
    
    if (!base64Image || !promptText) {
      return NextResponse.json({ 
        error: "Missing required parameters", 
        message: "Both base64Image and promptText are required" 
      }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }
    
    // The hardcoded key that's known to work (fallback)
    const FALLBACK_API_KEY = process.env.RUNWAY_API_KEY || "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";
    
    // Define different payload formats to try
    const payloadFormats = [
      // Flat structure format
      {
        name: 'flat',
        payload: {
          model: "gen4_turbo",
          promptImage: base64Image,
          promptText: promptText,
          ratio: "1280:720",
          duration: 5
        }
      },
      // Nested structure format
      {
        name: 'nested',
        payload: {
          model: "gen4_turbo",
          input: {
            promptImage: base64Image,
            promptText: promptText
          },
          parameters: {
            ratio: "1280:720",
            duration: 5
          }
        }
      }
    ];
    
    // Try different endpoints and approaches
    const apiEndpoints = [
      'https://api.dev.runwayml.com/v1/image_to_video',  // Try dev endpoint
      'https://api.runwayml.com/v1/image_to_video'       // Try production endpoint
    ];
    
    // These version headers should be tried in order
    // Note: 'latest' is actually a valid value for the header
    const versionHeaders = [
      null,         // No version header
      'latest',     // Latest version
      '2023-09-26', // Known working version  
      '2023-11-06', // Older version
      '2024-11-06', // From documentation
    ];
    
    let lastError = null;
    let taskId = null;
    
    // Try all combinations of endpoints, payload formats, and version headers
    for (const endpoint of apiEndpoints) {
      if (taskId) break; // Stop if we already have a successful result
      
      for (const format of payloadFormats) {
        if (taskId) break; // Stop if we already have a successful result
        
        for (const version of versionHeaders) {
          if (taskId) break; // Stop if we already have a successful result
          
          console.log(`Trying ${endpoint} with ${format.name} format and${version ? ' version ' + version : ' no version header'}`);
          
          const headers = {
            'Authorization': `Bearer ${FALLBACK_API_KEY}`,
            'Content-Type': 'application/json'
          };
          
          if (version) {
            headers['X-Runway-Version'] = version;
          }
          
          try {
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(format.payload)
            });
            
            console.log(`Response from ${endpoint} (${format.name}, ${version || 'no version'}): ${response.status}`);
            
            if (response.ok) {
              const responseData = await response.json();
              console.log('Task created successfully:', responseData.id);
              taskId = responseData.id;
              break;
            } else {
              const errorText = await response.text();
              console.log(`Error from ${endpoint} (${format.name}, ${version || 'no version'}): ${response.status} - ${errorText.substring(0, 100)}`);
              lastError = new Error(`API error: ${response.status} - ${errorText.substring(0, 200)}`);
            }
          } catch (error) {
            console.error(`Request error from ${endpoint} (${format.name}, ${version || 'no version'}):`, error.message);
            lastError = error;
          }
        }
      }
    }
    
    if (taskId) {
      // Successfully created a task
      return NextResponse.json({
        success: true,
        id: taskId,
        message: 'Task created successfully'
      }, { 
        status: 202,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    } else {
      // All attempts failed - return a more useful error message
      const errorMsg = lastError?.message || 'All API attempts failed';
      console.error("Failed to create task:", errorMsg);
      return NextResponse.json({
        success: false,
        error: errorMsg,
        message: 'Failed to create animation task after trying all API approaches',
        demoUrl: '/videos/demo.mp4', // Provide a fallback demo URL
        isDemo: true
      }, { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }
  } catch (error) {
    console.error("Error creating animation task:", error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
      demoUrl: '/videos/demo.mp4', // Provide a fallback demo URL
      isDemo: true
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }
}