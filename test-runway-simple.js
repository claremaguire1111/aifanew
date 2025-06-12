// Simplified test script for Runway API
require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

// Your API key from .env.local
const apiKey = process.env.RUNWAY_API_KEY;
console.log('Using API key starting with:', apiKey.substring(0, 10) + '...');

async function testRunwayAPI() {
  try {
    // First, try to get organization info to test the API key
    console.log('Testing Runway API connection...');
    
    const orgResponse = await axios.get('https://api.runwayml.com/v1/organization', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });
    
    console.log('Organization info:', orgResponse.data);
    
  } catch (error) {
    console.error('API Error:');
    console.error('Message:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
}

// Run the test
testRunwayAPI();