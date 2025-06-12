// Simple test script for Runway API
require('dotenv').config({ path: '.env.local' });
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Your API key from .env.local
const apiKey = process.env.RUNWAY_API_KEY;
console.log('Using API key starting with:', apiKey.substring(0, 10) + '...');

// Sample image (base64 encoded)
const imagePath = path.join(__dirname, 'public', 'images', 'Dulwich', 'Yinka.jpg');
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

async function testRunwayAPI() {
  try {
    console.log('Testing Runway API...');
    
    // Try to make a direct API call
    const response = await axios.post('https://api.runwayml.com/v1/image_to_video', {
      promptImage: base64Image,
      model: "gen4_turbo",
      promptText: "A beautiful sculpture coming to life in a park setting",
      duration: 5,
      ratio: "1280:720"
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06'
      }
    });
    
    console.log('API Response:', response.data);
    
  } catch (error) {
    console.error('API Error:');
    console.error('Message:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    }
  }
}

// Run the test
testRunwayAPI();