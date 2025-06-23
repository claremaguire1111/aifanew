// Test script for Gemini API integration
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Ensure API key is available
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';

// Function to convert image to base64
function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString('base64');
  } catch (error) {
    console.error('Error reading image file:', error);
    process.exit(1);
  }
}

// Test the Gemini API
async function testGeminiAPI() {
  console.log('Testing Gemini API integration...');
  
  // Path to test image
  const imagePath = path.join(__dirname, 'public', 'images', 'Dulwich', 'Yinka.jpg');
  
  // Convert image to base64
  const base64Image = imageToBase64(imagePath);
  console.log(`Image converted to base64 (${Math.round(base64Image.length / 1024)}KB)`);
  
  // Create API request data
  const requestData = {
    contents: [
      {
        parts: [
          {
            text: "Generate a video based on this image and description: A sculpture coming to life and dancing gracefully in a garden"
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Image
            }
          }
        ]
      }
    ],
    generation_config: {
      temperature: 0.9,
      top_p: 0.95,
      top_k: 40,
      max_output_tokens: 2048,
    }
  };
  
  console.log('Making request to Gemini API...');
  
  try {
    // Make API request
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }
    );
    
    // Check for success
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error (${response.status}):`, errorText);
      return;
    }
    
    // Process response
    const result = await response.json();
    console.log('Gemini API response received:');
    console.log(JSON.stringify(result, null, 2));
    
    // Extract video content if available
    const videoContent = result.candidates?.[0]?.content?.parts?.[0];
    if (videoContent?.text) {
      console.log('Response text:', videoContent.text);
    }
    if (videoContent?.video_url) {
      console.log('Video URL:', videoContent.video_url);
    }
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error testing Gemini API:', error);
  }
}

// Run the test
testGeminiAPI();