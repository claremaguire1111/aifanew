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
    const runwayApiKey = process.env.RUNWAY_API_KEY;
    if (!runwayApiKey) {
      console.error('Missing API key');
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }
    
    console.log('Initializing RunwayML client');
    // Set the API key for the SDK
    process.env.RUNWAYML_API_SECRET = runwayApiKey;
    const client = new RunwayML();

    console.log('Creating image-to-video task');
    // Create the task
    const task = await client.imageToVideo.create({
      model: 'gen4_turbo',
      promptImage: base64Image,
      promptText: prompt,
      ratio: '1280:720',
      duration: 5,
    });
    
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
    const runwayApiKey = process.env.RUNWAY_API_KEY;
    if (!runwayApiKey) {
      console.error('Missing API key');
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }
    
    process.env.RUNWAYML_API_SECRET = runwayApiKey;
    const client = new RunwayML();
    
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