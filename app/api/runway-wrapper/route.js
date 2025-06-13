import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Simple wrapper endpoint to proxy requests to Runway API
export async function POST(req) {
  console.log('POST request received to runway-wrapper endpoint');
  
  try {
    // Get API key
    const runwayApiKey = process.env.RUNWAY_API_KEY || "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";
    
    // Parse the request body
    const payload = await req.json();
    console.log('Received payload with keys:', Object.keys(payload));
    
    // Forward to Runway API without version headers
    const response = await fetch('https://api.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${runwayApiKey}`,
        'Content-Type': 'application/json'
        // Intentionally NOT including X-Runway-Version
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Runway API response status:', response.status);
    
    // Get the response as text first
    const responseText = await response.text();
    console.log('Runway API response text (first 100 chars):', responseText.substring(0, 100));
    
    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON');
      responseData = { error: 'Invalid JSON response', text: responseText.substring(0, 200) };
    }
    
    // Return the result with original status code
    return NextResponse.json(responseData, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error("Wrapper error:", error.message);
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

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204, // No content
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours cache for preflight requests
    },
  });
}