// Comprehensive test script for Runway API
require('dotenv').config({ path: '.env.local' });
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Your API key from .env.local
const apiKey = process.env.RUNWAY_API_KEY;
if (!apiKey) {
  console.error('Error: RUNWAY_API_KEY not found in .env.local');
  process.exit(1);
}

console.log('Using API key starting with:', apiKey.substring(0, 10) + '...');

// Sample image (base64 encoded)
const imagePath = path.join(__dirname, 'public', 'images', 'Dulwich', 'Yinka.jpg');
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = imageBuffer.toString('base64'); // Note: no data URL prefix

async function testRunwayAPI() {
  try {
    // 1. First test the API connection
    console.log('\n1. Testing API connection...');
    
    try {
      const orgResponse = await axios.get('https://api.runwayml.com/v1/organization', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      });
      
      console.log('✅ API connection successful');
      console.log('Organization:', orgResponse.data.organization);
    } catch (error) {
      console.error('❌ API connection failed:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Response:', error.response.data);
      }
      return; // Stop if we can't even connect
    }
    
    // 2. Test image-to-video API with the correct nested structure
    console.log('\n2. Testing image-to-video API with correct nested structure...');
    
    try {
      const response = await axios.post('https://api.runwayml.com/v1/image_to_video', {
        model: "gen4_turbo",
        input: {
          promptImage: base64Image,
          promptText: "A beautiful sculpture coming to life in a park setting"
        },
        parameters: {
          ratio: "1280:720",
          duration: 5
        }
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-Runway-Version': '2024-11-06'
        }
      });
      
      console.log('✅ Image-to-video request successful');
      console.log('Task ID:', response.data.id);
      
      // Save the task ID for checking status
      const taskId = response.data.id;
      
      // 3. Check task status
      console.log('\n3. Checking task status...');
      const statusResponse = await axios.get(`https://api.runwayml.com/v1/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-Runway-Version': '2024-11-06'
        }
      });
      
      console.log('✅ Task status check successful');
      console.log('Status:', statusResponse.data.status);
      console.log('Full response:', statusResponse.data);
      
    } catch (error) {
      console.error('❌ Image-to-video request failed:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Response:', error.response.data);
      }
    }
  } catch (error) {
    console.error('General error:', error.message);
  }
}

// Run the test
testRunwayAPI();