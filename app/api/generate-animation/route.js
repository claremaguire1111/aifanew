import { NextResponse } from 'next/server';
import RunwayML from '@runwayml/sdk';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';
// Increase the body size limit for this API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: false,
  },
};

export async function POST(req) {
  console.log('POST request received to generate-animation endpoint');
  try {
    // Parse the formData
    const formData = await req.formData();
    const image = formData.get('image');
    const prompt = formData.get('prompt')?.toString();

    if (!image || !prompt) {
      console.error('Missing image or prompt');
      return NextResponse.json({ error: "Missing image or prompt" }, { status: 400 });
    }

    // Convert the image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    
    // Get file size for debugging
    const fileSizeKB = Math.round(buffer.length / 1024);
    console.log(`Image size: ${fileSizeKB}KB`);
    
    // Check if image is too large for data URI (5MB limit from RunwayML)
    if (buffer.length > 5 * 1024 * 1024) {
      console.error('Image too large for data URI (>5MB)');
      return NextResponse.json({ 
        error: "Image file too large. Please use an image smaller than 5MB." 
      }, { status: 400 });
    }

    // Get and verify API key
    let runwayApiKey = process.env.RUNWAY_API_KEY;
    if (!runwayApiKey) {
      console.error('Missing API key - using hardcoded fallback key');
      // Use the hardcoded key from .env.local as fallback
      runwayApiKey = "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";
    }
    
    console.log('Initializing RunwayML client');
    // Set the API key for the SDK - for debugging, log a masked version
    console.log('API key starts with:', runwayApiKey.substring(0, 10) + '...');
    process.env.RUNWAYML_API_SECRET = runwayApiKey;
    const client = new RunwayML({ apiKey: runwayApiKey });

    console.log('Creating image-to-video task');
    
    // Try to create a task with various approaches
    let task;
    
    // First try the SDK with different strategies
    try {
      // We've seen that newer SDK versions may need to be initialized differently
      // or may have different parameter structures
      console.log('Attempting SDK with nested structure...');
      
      // Create the task using the SDK
      task = await client.imageToVideo.create({
        model: 'gen4_turbo',
        input: {
          promptImage: base64Image,
          promptText: prompt
        },
        parameters: {
          ratio: '1280:720',
          duration: 5
        }
      });
      
      console.log('Task created successfully with SDK and nested structure');
    } catch (sdkNestedError) {
      console.error('SDK nested structure error:', sdkNestedError);
      
      // Try SDK with flat structure
      try {
        console.log('Attempting SDK with flat structure...');
        
        task = await client.imageToVideo.create({
          model: 'gen4_turbo',
          promptImage: base64Image,
          promptText: prompt,
          ratio: '1280:720',
          duration: 5
        });
        
        console.log('Task created successfully with SDK and flat structure');
      } catch (sdkFlatError) {
        console.error('SDK flat structure error:', sdkFlatError);
        
        // Fall back to direct API calls with different version headers
        console.log('SDK approaches failed, trying direct API calls...');
        
        // Try multiple version headers
        const versionHeaders = [
          null,         // No version header
          '2023-11-06', // Older version
          '2024-06-27', // Latest possible current date
          '2024-11-06'  // From documentation
        ];
        
        let apiSuccess = false;
        let lastError = null;
        
        for (const version of versionHeaders) {
          if (apiSuccess) break;
          
          const headers = {
            'Authorization': `Bearer ${runwayApiKey}`,
            'Content-Type': 'application/json'
          };
          
          if (version) {
            headers['X-Runway-Version'] = version;
            console.log(`Trying direct API with version: ${version}`);
          } else {
            console.log('Trying direct API without version header');
          }
          
          try {
            const response = await fetch('https://api.runwayml.com/v1/image_to_video', {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                model: 'gen4_turbo',
                input: {
                  promptImage: base64Image,
                  promptText: prompt
                },
                parameters: {
                  ratio: '1280:720',
                  duration: 5
                }
              })
            });
            
            if (response.ok) {
              task = await response.json();
              console.log(`Task created with direct API call using${version ? ' version ' + version : ' no version header'}`);
              apiSuccess = true;
              break;
            } else {
              const errorText = await response.text();
              console.error(`API error with${version ? ' version ' + version : ' no version header'}: ${response.status} - ${errorText.substring(0, 100)}`);
              lastError = new Error(`API error: ${response.status} - ${errorText.substring(0, 200)}`);
            }
          } catch (apiError) {
            console.error(`Direct API call error with${version ? ' version ' + version : ' no version header'}:`, apiError);
            lastError = apiError;
          }
        }
        
        if (!apiSuccess) {
          console.error('All API approaches failed');
          throw lastError || new Error('Failed to create task with all API approaches');
        }
      }
    }
    
    console.log(`Task created with ID: ${task.id}`);
    
    // Immediately return the task ID - we won't wait for completion in the serverless function
    return NextResponse.json({
      success: true,
      taskId: task.id,
      message: 'Task initiated successfully',
    }, { 
      status: 202, // Accepted
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error("Animation generation error:", error.message);
    // Log full error details for debugging
    console.error(error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
      animationUrl: '/videos/demo.mp4', // Fallback for immediate viewing
      isDemo: true,
      message: 'Error occurred during video generation',
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

// Add a new endpoint to check task status
export async function GET(req) {
  const url = new URL(req.url);
  const taskId = url.searchParams.get('taskId');
  
  if (!taskId) {
    return NextResponse.json(
      { error: "Missing taskId parameter" },
      { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
  
  try {
    let runwayApiKey = process.env.RUNWAY_API_KEY;
    if (!runwayApiKey) {
      console.error('Missing API key for task status check - using hardcoded fallback key');
      // Use the hardcoded key from .env.local as fallback
      runwayApiKey = "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";
    }
    
    process.env.RUNWAYML_API_SECRET = runwayApiKey;
    const client = new RunwayML({ apiKey: runwayApiKey });
    
    // Get task status
    const status = await client.tasks.retrieve(taskId);
    
    if (status.status === 'SUCCEEDED') {
      return NextResponse.json({
        success: true,
        completed: true,
        status: status.status,
        animationUrl: status.output[0],
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    } else if (status.status === 'FAILED') {
      return NextResponse.json({
        success: false,
        completed: true,
        status: status.status,
        error: status.error || 'Task failed',
        animationUrl: '/videos/demo.mp4',
        isDemo: true,
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    } else {
      // Still processing
      return NextResponse.json({
        success: true,
        completed: false,
        status: status.status,
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }
  } catch (error) {
    console.error("Error checking task status:", error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
}

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204, // No content
    headers: {
      'Allow': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400', // 24 hours cache for preflight requests
    },
  });
}