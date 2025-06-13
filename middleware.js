import { NextResponse } from 'next/server';

// Middleware to handle CORS and method checking
export function middleware(request) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Only apply middleware to API routes
  if (pathname.startsWith('/api/')) {
    // Check if it's an OPTIONS request (preflight)
    if (request.method === 'OPTIONS') {
      // Handle preflight request
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Continue with the request but add CORS headers
    const response = NextResponse.next();
    
    // Add CORS headers to the response
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }

  // For non-API routes, continue without modification
  return NextResponse.next();
}

// Configure middleware to run only for API routes
export const config = {
  matcher: '/api/:path*',
};