import { NextResponse } from 'next/server';
import RunwayML from '@runwayml/sdk';
import { handleOptionsRequest, corsResponse, corsErrorResponse } from '../cors-fix';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Export runtime configuration
export const config = {
  runtime: 'nodejs', // Use Node.js runtime for compatibility with RunwayML SDK
};

// This is a fallback that will handle both FormData and JSON
export async function POST(req) {
  console.log('POST request received to generate-animation endpoint');
  try {
    // Try to determine the content type
    const contentType = req.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    let base64Image, promptText;
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData (multipart/form-data)
      try {
        const formData = await req.formData();
        const image = formData.get('image');
        promptText = formData.get('prompt')?.toString();
        
        if (!image || !promptText) {
          console.error('Missing image or prompt in FormData');
          return corsErrorResponse("Missing image or prompt", 400);
        }
        
        // Convert the image to base64
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
        
        // Check file size
        if (buffer.length > 5 * 1024 * 1024) {
          console.error('Image too large for data URI (>5MB)');
          return corsErrorResponse(
            "Image file too large. Please use an image smaller than 5MB.",
            400
          );
        }
      } catch (formDataError) {
        console.error('FormData parsing error:', formDataError);
        // If FormData parsing fails, we'll try JSON next
      }
    }
    
    // If we couldn't get the data from FormData, try JSON
    if (!base64Image || !promptText) {
      try {
        const jsonData = await req.json();
        base64Image = jsonData.base64Image;
        promptText = jsonData.promptText;
        
        if (!base64Image || !promptText) {
          console.error('Missing base64Image or promptText in JSON');
          return corsErrorResponse("Missing required parameters", 400);
        }
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        return corsErrorResponse(
          "Invalid request format. Expected FormData or JSON with required parameters.", 
          400
        );
      }
    }
    
    // Now we have base64Image and promptText one way or another
    
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
    let success = false;
    
    // First try the SDK with different strategies
    try {
      console.log('Attempting SDK with nested structure...');
      
      // Create the task using the SDK
      task = await client.imageToVideo.create({
        model: 'gen4_turbo',
        input: {
          promptImage: base64Image,
          promptText: promptText
        },
        parameters: {
          ratio: '1280:720',
          duration: 5
        }
      });
      
      console.log('Task created successfully with SDK and nested structure');
      success = true;
    } catch (sdkNestedError) {
      console.error('SDK nested structure error:', sdkNestedError.message);
      
      // Try SDK with flat structure
      try {
        console.log('Attempting SDK with flat structure...');
        
        task = await client.imageToVideo.create({
          model: 'gen4_turbo',
          promptImage: base64Image,
          promptText: promptText,
          ratio: '1280:720',
          duration: 5
        });
        
        console.log('Task created successfully with SDK and flat structure');
        success = true;
      } catch (sdkFlatError) {
        console.error('SDK flat structure error:', sdkFlatError.message);
        
        // Fall back to direct API calls with different version headers
        console.log('SDK approaches failed, trying direct API calls...');
        
        // Try multiple version headers
        const versionHeaders = [
          null,         // No version header
          'latest',     // Latest version
          '2023-09-26', // Known working version
          '2023-11-06', // Older version
          '2024-11-06'  // From documentation
        ];
        
        let lastError = null;
        
        for (const version of versionHeaders) {
          if (success) break;
          
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
                  promptText: promptText
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
              success = true;
              break;
            } else {
              const errorText = await response.text();
              console.error(`API error with${version ? ' version ' + version : ' no version header'}: ${response.status} - ${errorText.substring(0, 100)}`);
              lastError = new Error(`API error: ${response.status} - ${errorText.substring(0, 200)}`);
            }
          } catch (apiError) {
            console.error(`Direct API call error with${version ? ' version ' + version : ' no version header'}:`, apiError.message);
            lastError = apiError;
          }
        }
        
        if (!success) {
          console.error('All API approaches failed');
          throw lastError || new Error('Failed to create task with all API approaches');
        }
      }
    }
    
    if (success && task && task.id) {
      console.log(`Task created with ID: ${task.id}`);
      
      // Immediately return the task ID
      return corsResponse({
        success: true,
        taskId: task.id,
        message: 'Task initiated successfully',
      }, { 
        status: 202 // Accepted
      });
    } else {
      throw new Error('Task creation failed or returned no ID');
    }
  } catch (error) {
    console.error("Animation generation error:", error.message);
    
    return corsErrorResponse(
      error.message || 'Unknown error occurred',
      500,
      {
        demoUrl: '/videos/demo.mp4', // Fallback for immediate viewing
        isDemo: true,
        message: 'Error occurred during video generation',
      }
    );
  }
}

// Add a new endpoint to check task status
export async function GET(req) {
  const url = new URL(req.url);
  const taskId = url.searchParams.get('taskId');
  
  if (!taskId) {
    return corsErrorResponse("Missing taskId parameter", 400);
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
    
    try {
      // Get task status
      const status = await client.tasks.retrieve(taskId);
      
      if (status.status === 'SUCCEEDED') {
        return corsResponse({
          success: true,
          completed: true,
          status: status.status,
          output: status.output,
        });
      } else if (status.status === 'FAILED') {
        return corsErrorResponse(
          status.error || 'Task failed',
          200,
          {
            completed: true,
            status: status.status,
            demoUrl: '/videos/demo.mp4',
            isDemo: true,
          }
        );
      } else {
        // Still processing
        return corsResponse({
          success: true,
          completed: false,
          status: status.status,
        });
      }
    } catch (sdkError) {
      console.error("SDK error checking task status:", sdkError.message);
      
      // Fall back to direct API calls
      const apiEndpoints = [
        `https://api.dev.runwayml.com/v1/tasks/${taskId}`,
        `https://api.runwayml.com/v1/tasks/${taskId}`
      ];
      
      const versionHeaders = [
        null,
        'latest',
        '2023-09-26',
        '2023-11-06',
        '2024-11-06'
      ];
      
      let statusData = null;
      let lastError = sdkError;
      
      for (const endpoint of apiEndpoints) {
        if (statusData) break;
        
        for (const version of versionHeaders) {
          if (statusData) break;
          
          const headers = {
            'Authorization': `Bearer ${runwayApiKey}`,
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
            
            if (response.ok) {
              statusData = await response.json();
              break;
            } else {
              const errorText = await response.text();
              lastError = new Error(`API error: ${response.status} - ${errorText.substring(0, 200)}`);
            }
          } catch (error) {
            lastError = error;
          }
        }
      }
      
      if (statusData) {
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
            demoUrl: '/videos/demo.mp4'
          }, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
          });
        } else {
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
      }
      
      // If all direct API calls fail, throw the last error
      throw lastError;
    }
  } catch (error) {
    console.error("Error checking task status:", error);
    return corsErrorResponse(
      error.message || 'Unknown error occurred',
      500,
      {
        demoUrl: '/videos/demo.mp4',
        isDemo: true
      }
    );
  }
}

// Handle OPTIONS preflight requests
export function OPTIONS() {
  return handleOptionsRequest();
}