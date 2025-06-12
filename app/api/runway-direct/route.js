import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Simple endpoint to provide the API key to the client in a secure way
export async function GET(req) {
  console.log('GET request received to runway-direct endpoint');
  
  const runwayApiKey = process.env.RUNWAY_API_KEY;
  if (!runwayApiKey) {
    console.error('Missing API key in environment variables');
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  
  // Return the API key - in a real production app, you would implement more
  // security measures like JWT tokens, rate limiting, etc.
  return NextResponse.json({ 
    apiKey: runwayApiKey,
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204, // No content
    headers: {
      'Allow': 'GET, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours cache for preflight requests
    },
  });
}