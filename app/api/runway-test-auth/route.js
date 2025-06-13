import { NextResponse } from 'next/server';

// Mark the route as dynamic to ensure it's not statically optimized
export const dynamic = 'force-dynamic';

// Simple endpoint to test Runway API authentication
export async function GET(req) {
  console.log('GET request received to runway-test-auth endpoint');
  
  try {
    // Check for API key with detailed logging
    // Hardcoded key from .env.local that we know works
    const hardcodedKey = "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";
    
    // Get API key from environment
    const envKey = process.env.RUNWAY_API_KEY;
    
    // Log info about keys
    console.log('Environment keys available:', Object.keys(process.env).filter(k => !k.includes('SECRET')).join(', '));
    console.log('Environment RUNWAY_API_KEY exists:', !!envKey);
    if (envKey) {
      console.log('Env key starts with:', envKey.substring(0, 10) + '...');
    }
    console.log('Hardcoded key starts with:', hardcodedKey.substring(0, 10) + '...');
    
    // Test both keys
    const results = [];
    
    // Test the environment key if it exists
    if (envKey) {
      try {
        console.log('Testing environment API key...');
        const envResponse = await fetch('https://api.dev.runwayml.com/v1/organization', {
          headers: {
            'Authorization': `Bearer ${envKey}`,
            'X-Runway-Version': '2024-11-06'
          }
        });
        
        const envStatus = envResponse.status;
        console.log('Environment key API response status:', envStatus);
        
        let envResponseData;
        try {
          const envResponseText = await envResponse.text();
          console.log('Env key response text (first 100 chars):', envResponseText.substring(0, 100));
          envResponseData = JSON.parse(envResponseText);
        } catch (e) {
          envResponseData = { error: 'Failed to parse response' };
        }
        
        results.push({
          key: 'environment',
          status: envStatus,
          success: envResponse.ok,
          data: envResponseData
        });
      } catch (envError) {
        console.error('Error testing environment key:', envError);
        results.push({
          key: 'environment',
          error: envError.message,
          success: false
        });
      }
    }
    
    // Test the hardcoded key
    try {
      console.log('Testing hardcoded API key...');
      const hardResponse = await fetch('https://api.dev.runwayml.com/v1/organization', {
        headers: {
          'Authorization': `Bearer ${hardcodedKey}`,
          'X-Runway-Version': '2024-11-06'
        }
      });
      
      const hardStatus = hardResponse.status;
      console.log('Hardcoded key API response status:', hardStatus);
      
      let hardResponseData;
      try {
        const hardResponseText = await hardResponse.text();
        console.log('Hardcoded key response text (first 100 chars):', hardResponseText.substring(0, 100));
        hardResponseData = JSON.parse(hardResponseText);
      } catch (e) {
        hardResponseData = { error: 'Failed to parse response' };
      }
      
      results.push({
        key: 'hardcoded',
        status: hardStatus,
        success: hardResponse.ok,
        data: hardResponseData
      });
    } catch (hardError) {
      console.error('Error testing hardcoded key:', hardError);
      results.push({
        key: 'hardcoded',
        error: hardError.message,
        success: false
      });
    }
    
    // Test without Bearer prefix
    try {
      console.log('Testing API key without Bearer prefix...');
      const noBearerResponse = await fetch('https://api.dev.runwayml.com/v1/organization', {
        headers: {
          'Authorization': hardcodedKey,
          'X-Runway-Version': '2024-11-06'
        }
      });
      
      const noBearerStatus = noBearerResponse.status;
      console.log('No Bearer prefix API response status:', noBearerStatus);
      
      let noBearerResponseData;
      try {
        const noBearerResponseText = await noBearerResponse.text();
        noBearerResponseData = JSON.parse(noBearerResponseText);
      } catch (e) {
        noBearerResponseData = { error: 'Failed to parse response' };
      }
      
      results.push({
        key: 'noBearer',
        status: noBearerStatus,
        success: noBearerResponse.ok,
        data: noBearerResponseData
      });
    } catch (noBearerError) {
      console.error('Error testing without Bearer prefix:', noBearerError);
      results.push({
        key: 'noBearer',
        error: noBearerError.message,
        success: false
      });
    }
    
    // Return results
    return NextResponse.json({
      results,
      working: results.some(r => r.success),
      recommendation: results.find(r => r.success)?.key || 'none'
    });
  } catch (error) {
    console.error('Error in auth test:', error);
    return NextResponse.json({
      error: error.message,
      success: false
    }, { status: 500 });
  }
}