import { NextResponse } from 'next/server';
import { handleOptionsRequest, corsResponse, corsErrorResponse } from '../cors-fix';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Export runtime configuration
export const config = {
  runtime: 'nodejs',
};

// Environment variable or hardcoded fallback (should be in .env.local)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBKblUPudfDWGM6e3_5JeXC9iKqyq5lgi0";
const GEMINI_API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// This is a fallback that will handle both FormData and JSON
export async function POST(req) {
  console.log('POST request received to gemini-video endpoint');
  try {
    // Try to determine the content type
    const contentType = req.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    let base64Image, promptText, isTextOnly = false;
    
    // Try to parse the request
    try {
      const jsonData = await req.json();
      
      // Check if this is a text-only request
      if (jsonData.textOnlyPrompt) {
        promptText = jsonData.textOnlyPrompt;
        isTextOnly = true;
        console.log('Processing text-only request:', promptText.substring(0, 100) + '...');
      } else {
        // Handle image + text request
        base64Image = jsonData.base64Image;
        if (base64Image && base64Image.startsWith('data:')) {
          // Extract the base64 part if it's a data URI
          base64Image = base64Image.split(',')[1];
        }
        promptText = jsonData.promptText;
        
        if (!base64Image || !promptText) {
          // Try FormData if JSON doesn't have what we need
          if (contentType.includes('multipart/form-data')) {
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
              base64Image = buffer.toString('base64');
              
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
              return corsErrorResponse("Failed to parse FormData", 400);
            }
          } else {
            console.error('Missing required parameters');
            return corsErrorResponse("Missing required parameters", 400);
          }
        }
      }
    } catch (parseError) {
      console.error('Request parsing error:', parseError);
      return corsErrorResponse(
        "Invalid request format. Expected JSON or FormData with required parameters.", 
        400
      );
    }
    
    // Ensure we have at least a prompt
    if (!promptText) {
      console.error('No prompt text found in request');
      return corsErrorResponse("Missing prompt text", 400);
    }
    
    // Prepare the request to Gemini API
    console.log('Preparing request to Gemini API');
    
    // Create different request payloads based on whether this is text-only or image+text
    const geminiRequestData = {
      contents: [
        {
          parts: isTextOnly ? 
            // Text-only request
            [
              {
                text: `Describe in detail a sculpture based on this concept: ${promptText}. Include details about its form, materials, textures, and how it might be displayed or experienced.`
              }
            ] : 
            // Image + text request
            [
              {
                text: `Generate a video based on this image and description: ${promptText}`
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ]
        }
      ],
      generation_config: {
        temperature: 0.9,
        top_p: 0.95,
        top_k: 40,
        max_output_tokens: 2048,
      }
    };
    
    // Make the request to Gemini API
    console.log('Making request to Gemini API');
    
    const apiUrl = `${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geminiRequestData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${errorText.substring(0, 200)}`);
      throw new Error(`Gemini API error: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Gemini API response received');
    
    // Extract the response text from Gemini
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      console.error('No text in Gemini response:', result);
      throw new Error('Failed to generate response with Gemini API');
    }
    
    console.log('Gemini response text (sample):', responseText.substring(0, 200) + '...');
    
    // Use a fallback demo video since Gemini doesn't directly generate videos
    const demoVideoUrl = '/videos/demo.mp4';
    
    // Generate a task ID for client tracking (using UUID-like format)
    const taskId = 'gemini_' + Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    // Store the result in memory (for a real app, use a database)
    // This is a simplified approach for demonstration
    global.geminiTasks = global.geminiTasks || {};
    global.geminiTasks[taskId] = {
      status: 'SUCCEEDED',
      output: {
        videoUrl: demoVideoUrl,
        geminiDescription: responseText
      }
    };
    
    // Return task ID to client
    return corsResponse({
      success: true,
      taskId: taskId,
      message: 'Video generation task initiated successfully',
    }, { 
      status: 202 // Accepted
    });
    
  } catch (error) {
    console.error("Gemini video generation error:", error.message);
    
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

// Endpoint to check task status
export async function GET(req) {
  const url = new URL(req.url);
  const taskId = url.searchParams.get('taskId');
  
  if (!taskId) {
    return corsErrorResponse("Missing taskId parameter", 400);
  }
  
  try {
    // Retrieve task from "storage"
    // In a real implementation, this would query a database
    const taskStorage = global.geminiTasks || {};
    const task = taskStorage[taskId];
    
    if (!task) {
      return corsErrorResponse(
        "Task not found",
        404
      );
    }
    
    if (task.status === 'SUCCEEDED') {
      return corsResponse({
        success: true,
        completed: true,
        status: task.status,
        output: task.output,
        // Include isGemini flag so frontend knows this came from Gemini
        isGemini: true,
        // Include the description separately for easy access
        geminiDescription: task.output.geminiDescription
      });
    } else if (task.status === 'FAILED') {
      return corsErrorResponse(
        task.error || 'Task failed',
        200,
        {
          completed: true,
          status: task.status,
          demoUrl: '/videos/demo.mp4',
          isDemo: true,
        }
      );
    } else {
      // Still processing
      return corsResponse({
        success: true,
        completed: false,
        status: task.status,
      });
    }
  } catch (error) {
    console.error("Error checking Gemini task status:", error);
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