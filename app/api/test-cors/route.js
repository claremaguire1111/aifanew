import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

export async function POST(req) {
  console.log('POST request received to test-cors endpoint');
  
  return NextResponse.json(
    { message: "POST request successful" },
    { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    }
  );
}

export async function GET() {
  console.log('GET request received to test-cors endpoint');
  
  return NextResponse.json(
    { message: "GET request successful" },
    { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    }
  );
}

export async function OPTIONS() {
  console.log('OPTIONS request received to test-cors endpoint');
  
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