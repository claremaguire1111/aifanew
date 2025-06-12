import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

/**
 * Simple API endpoint that always returns a demo video
 * Used as a reliable fallback for the animation generation feature
 */
export async function POST(req) {
  console.log('POST request received to animation-demo endpoint');
  
  // No external API calls, just return a fixed demo video path
  return NextResponse.json({
    success: true,
    animationUrl: '/videos/demo.mp4',
    isDemo: true,
    message: 'Using demo video while API is being updated',
  }, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function GET() {
  console.log('GET request received to animation-demo endpoint');
  
  return NextResponse.json({
    success: true,
    animationUrl: '/videos/demo.mp4',
    isDemo: true,
    message: 'Using demo video while API is being updated',
  }, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function OPTIONS() {
  console.log('OPTIONS request received to animation-demo endpoint');
  
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