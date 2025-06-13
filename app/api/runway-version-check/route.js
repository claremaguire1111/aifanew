import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Helper to try API request with different version headers
export async function GET(req) {
  console.log('GET request received to runway-version-check endpoint');
  
  try {
    // Get API key
    const runwayApiKey = process.env.RUNWAY_API_KEY || "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";
    
    // List of version headers to try
    const versionHeaders = [
      null,            // No version header
      'v1',            // Just v1
      'latest',        // Try latest
      '2023-11-06',    // ISO date format
      '20231106',      // Date without hyphens
      '2023-11',       // Year-month only
      '2024-06'        // Latest valid year-month
    ];
    
    // Try each version header with a simple organization request
    const results = [];
    
    for (const version of versionHeaders) {
      const headers = {
        'Authorization': `Bearer ${runwayApiKey}`,
        'Content-Type': 'application/json'
      };
      
      let headerType = 'none';
      
      if (version) {
        if (version === 'v1' || version === 'latest') {
          // Try as Accept header
          headers['Accept'] = `application/json;version=${version}`;
          headerType = 'Accept';
        } else {
          // Try as X-Runway-Version
          headers['X-Runway-Version'] = version;
          headerType = 'X-Runway-Version';
        }
      }
      
      try {
        const response = await fetch('https://api.runwayml.com/v1/organization', {
          method: 'GET',
          headers: headers
        });
        
        results.push({
          version,
          headerType,
          status: response.status,
          success: response.ok
        });
      } catch (error) {
        results.push({
          version,
          headerType,
          error: error.message,
          success: false
        });
      }
    }
    
    // Find successful versions
    const successfulVersions = results.filter(r => r.success);
    
    return NextResponse.json({
      results,
      successfulVersions,
      recommended: successfulVersions.length > 0 ? successfulVersions[0] : null
    });
  } catch (error) {
    console.error("Version check error:", error.message);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
    }, { status: 500 });
  }
}