// Simple test for RunwayML API
// Run with Node.js: node runway-test.js

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Hardcoded API key - make sure this key is valid
const API_KEY = "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";

// Sample image path - should be a valid path to a small image (under 5MB)
const IMAGE_PATH = path.join(__dirname, 'public', 'images', 'Dulwich', 'Yinka.jpg');

async function testRunwayAPI() {
  try {
    console.log('Reading image from:', IMAGE_PATH);
    const imageBuffer = fs.readFileSync(IMAGE_PATH);
    const base64Image = imageBuffer.toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64Image}`;
    
    console.log('Image size:', Math.round(base64Image.length * 0.75 / 1024), 'KB');

    // Test 1: Flat structure with data URI
    console.log('\n=== TEST 1: Flat structure with data URI ===');
    const flatPayload = {
      model: 'gen4_turbo',
      promptImage: dataUri,
      promptText: 'A beautiful sculpture coming to life in a garden',
      ratio: '1280:720',
      duration: 5
    };
    
    try {
      const flatResponse = await fetch('https://api.runwayml.com/v1/image_to_video', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'X-Runway-Version': '2024-11-06'
        },
        body: JSON.stringify(flatPayload)
      });
      
      const flatStatus = flatResponse.status;
      console.log('Flat structure response status:', flatStatus);
      
      if (flatResponse.ok) {
        const flatData = await flatResponse.json();
        console.log('Success! Task ID:', flatData.id);
        return; // Exit if successful
      } else {
        const flatErrorText = await flatResponse.text();
        console.log('Flat structure error:', flatErrorText);
      }
    } catch (error) {
      console.error('Flat structure error:', error.message);
    }
    
    // Test 2: Nested structure with data URI
    console.log('\n=== TEST 2: Nested structure with data URI ===');
    const nestedPayload = {
      model: 'gen4_turbo',
      input: {
        promptImage: dataUri,
        promptText: 'A beautiful sculpture coming to life in a garden'
      },
      parameters: {
        ratio: '1280:720',
        duration: 5
      }
    };
    
    try {
      const nestedResponse = await fetch('https://api.runwayml.com/v1/image_to_video', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'X-Runway-Version': '2024-11-06'
        },
        body: JSON.stringify(nestedPayload)
      });
      
      const nestedStatus = nestedResponse.status;
      console.log('Nested structure response status:', nestedStatus);
      
      if (nestedResponse.ok) {
        const nestedData = await nestedResponse.json();
        console.log('Success! Task ID:', nestedData.id);
      } else {
        const nestedErrorText = await nestedResponse.text();
        console.log('Nested structure error:', nestedErrorText);
      }
    } catch (error) {
      console.error('Nested structure error:', error.message);
    }
    
    // Test 3: Raw base64 (without data URI)
    console.log('\n=== TEST 3: Flat structure with raw base64 (no data URI) ===');
    const rawPayload = {
      model: 'gen4_turbo',
      promptImage: base64Image, // Raw base64 without data URI prefix
      promptText: 'A beautiful sculpture coming to life in a garden',
      ratio: '1280:720',
      duration: 5
    };
    
    try {
      const rawResponse = await fetch('https://api.runwayml.com/v1/image_to_video', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'X-Runway-Version': '2024-11-06'
        },
        body: JSON.stringify(rawPayload)
      });
      
      const rawStatus = rawResponse.status;
      console.log('Raw base64 response status:', rawStatus);
      
      if (rawResponse.ok) {
        const rawData = await rawResponse.json();
        console.log('Success! Task ID:', rawData.id);
      } else {
        const rawErrorText = await rawResponse.text();
        console.log('Raw base64 error:', rawErrorText);
      }
    } catch (error) {
      console.error('Raw base64 error:', error.message);
    }
    
  } catch (error) {
    console.error('General error:', error);
  }
}

// Run the test
testRunwayAPI();