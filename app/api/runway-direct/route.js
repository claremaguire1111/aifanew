import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Simple endpoint to provide the API key to the client in a secure way
export async function GET(req) {
  console.log('GET request received to runway-direct endpoint');
  
  try {
    // Log all environment variables for debugging (excluding sensitive values)
    const envKeys = Object.keys(process.env).filter(key => !key.includes('SECRET') && !key.includes('KEY'));
    console.log('Available environment variables:', envKeys.join(', '));
    
    // Check for API key with detailed logging
    const runwayApiKey = process.env.RUNWAY_API_KEY;
    if (!runwayApiKey) {
      console.error('RUNWAY_API_KEY is missing in environment variables');
      
      // Check for alternate environment variable formats
      const alternateKeys = [
        'NEXT_PUBLIC_RUNWAY_API_KEY',
        'VERCEL_RUNWAY_API_KEY',
        'RUNWAY_KEY'
      ];
      
      const foundAlternate = alternateKeys.find(key => process.env[key]);
      if (foundAlternate) {
        console.log(`Found alternate API key in ${foundAlternate}`);
        return NextResponse.json({ 
          apiKey: process.env[foundAlternate],
          source: foundAlternate
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        });
      }
      
      return NextResponse.json({ 
        error: "API key not configured", 
        message: "Please set the RUNWAY_API_KEY environment variable in Vercel"
      }, { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    
    console.log('RUNWAY_API_KEY is properly configured');
    
    // Return the API key - in a real production app, you would implement more
    // security measures like JWT tokens, rate limiting, etc.
    return NextResponse.json({ 
      apiKey: runwayApiKey,
      configured: true
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in runway-direct endpoint:', error);
    return NextResponse.json({ 
      error: "Internal server error", 
      message: error.message
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
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