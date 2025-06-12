// Test script for Runway API with different version headers
require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

// Your API key from .env.local
const apiKey = process.env.RUNWAY_API_KEY;
console.log('Using API key starting with:', apiKey.substring(0, 10) + '...');

// Array of possible version dates to test
const versionDates = [
  '2023-11-06', // Older
  '2024-01-01', // Beginning of 2024
  '2024-05-01', // Mid-year
  '2024-06-01', // More recent
  '2024-06-15', // Current month
  '2024-06-27', // Latest possible
  '2024-11-06', // From documentation
];

async function testVersion(versionDate) {
  try {
    console.log(`\nTesting with version: ${versionDate}`);
    
    const response = await axios.get('https://api.runwayml.com/v1/organization', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'X-Runway-Version': versionDate
      }
    });
    
    console.log('SUCCESS! Response:', response.data);
    return true;
  } catch (error) {
    console.error(`FAILED with version ${versionDate}:`);
    console.error('Message:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
    return false;
  }
}

async function runTests() {
  console.log('Testing Runway API with different version headers...');
  
  // Try without a version header first
  try {
    console.log('\nTesting WITHOUT version header:');
    const response = await axios.get('https://api.runwayml.com/v1/organization', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    console.log('SUCCESS! Response:', response.data);
  } catch (error) {
    console.error('FAILED without version header:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
  
  // Try each version
  for (const version of versionDates) {
    await testVersion(version);
  }
}

// Run all tests
runTests();