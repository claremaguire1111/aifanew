import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// This is a simple route that checks if required environment variables are set
// Useful for debugging deployment issues
export async function GET() {
  // Only check if environment variables exist, don't expose their values
  const envStatus = {
    RUNWAY_API_KEY: !!process.env.RUNWAY_API_KEY,
    NEXT_PUBLIC_JURY_VOTING_PASSWORD: !!process.env.NEXT_PUBLIC_JURY_VOTING_PASSWORD,
    DULWICH_PASSWORD: !!process.env.DULWICH_PASSWORD,
    NODE_ENV: process.env.NODE_ENV || 'not set',
    VERCEL_ENV: process.env.VERCEL_ENV || 'not set',
  };
  
  return NextResponse.json({
    status: 'ok',
    environment: envStatus,
    message: 'Environment variable status check'
  });
}