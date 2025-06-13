// Direct API test for Runway ML Gen-4 Turbo
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Hardcoded API key in case environment variable is not set
const FALLBACK_API_KEY = "key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07";
const API_KEY = process.env.RUNWAY_API_KEY || FALLBACK_API_KEY;

// Test image path
const imagePath = path.join(__dirname, 'public', 'images', 'Dulwich', 'Yinka.jpg');

// Function to read image and convert to base64
function getImageBase64() {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    console.log(`Image size: ${Math.round(imageBuffer.length / 1024)}KB`);
    console.log(`Base64 size: ${Math.round(base64Image.length / 1024)}KB`);
    return base64Image;
  } catch (error) {
    console.error('Error reading image:', error);
    throw error;
  }
}

// Function to create task
async function createTask() {
  console.log('Creating image-to-video task...');

  try {
    // Get base64 image
    const base64Image = getImageBase64();
    
    // Create task payload according to official API format
    const payload = {
      model: "gen4_turbo",
      input: {
        promptImage: base64Image,
        promptText: "The sculpture is dancing in a magical garden"
      },
      parameters: {
        ratio: "1280:720",
        duration: 5
      }
    };
    
    // Log payload structure (without full base64 data)
    const logPayload = {
      ...payload,
      input: {
        ...payload.input,
        promptImage: `${base64Image.substring(0, 20)}...` // Just show the beginning
      }
    };
    console.log('Request payload structure:', JSON.stringify(logPayload, null, 2));
    
    // Send API request
    const response = await axios.post('https://api.runwayml.com/v1/tasks', payload, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06'
      }
    });
    
    console.log('Task created successfully:');
    console.log(response.data);
    
    return response.data.id;
  } catch (error) {
    console.error('Error creating task:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else {
      console.error(error.message);
    }
    throw error;
  }
}

// Function to check task status
async function checkTaskStatus(taskId) {
  console.log(`Checking status for task ${taskId}...`);
  
  try {
    const response = await axios.get(`https://api.runwayml.com/v1/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06'
      }
    });
    
    console.log('Task status:');
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error checking task status:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else {
      console.error(error.message);
    }
    throw error;
  }
}

// Main function
async function main() {
  try {
    // Create a task
    const taskId = await createTask();
    
    // Poll for task status
    let taskStatus;
    let isComplete = false;
    
    console.log('Polling for task completion...');
    
    while (!isComplete) {
      // Wait 5 seconds between polls
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Check status
      taskStatus = await checkTaskStatus(taskId);
      
      if (['SUCCEEDED', 'FAILED'].includes(taskStatus.status)) {
        isComplete = true;
      }
    }
    
    if (taskStatus.status === 'SUCCEEDED') {
      console.log('Task completed successfully!');
      console.log('Output URL:', taskStatus.output[0]);
    } else {
      console.error('Task failed:', taskStatus.error);
    }
  } catch (error) {
    console.error('Error in main execution:', error);
  }
}

// Run the test
main();