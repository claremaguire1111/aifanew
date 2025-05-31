// This script runs during Vercel build to ensure all image directories are copied correctly
const fs = require('fs-extra');
const path = require('path');

console.log('Running Vercel build script to ensure images are copied correctly...');

// This is the environment variable Vercel sets to indicate if it's a build
if (process.env.VERCEL_ENV) {
  console.log(`Detected Vercel environment: ${process.env.VERCEL_ENV}`);
  
  try {
    // Define the paths
    const publicDir = path.join(__dirname, 'public');
    const socialDir = path.join(publicDir, 'images', 'social');
    const supportDir = path.join(publicDir, 'images', 'support');
    
    // Verify the source directories exist
    if (fs.existsSync(socialDir)) {
      console.log(`Found social images directory: ${socialDir}`);
      
      // List some files to verify
      const socialFiles = fs.readdirSync(socialDir).slice(0, 5);
      console.log('Example social files:', socialFiles);
    } else {
      console.error('WARNING: Social images directory not found!');
    }
    
    if (fs.existsSync(supportDir)) {
      console.log(`Found support images directory: ${supportDir}`);
      
      // List some files to verify
      const supportFiles = fs.readdirSync(supportDir);
      console.log('Support files:', supportFiles);
    } else {
      console.error('WARNING: Support images directory not found!');
    }
    
    // Create a verification file to indicate this script ran
    const verificationContent = `
      Social and Support image directories verified at build time
      Timestamp: ${new Date().toISOString()}
    `;
    
    fs.writeFileSync(path.join(publicDir, 'image-verification.txt'), verificationContent);
    console.log('Created verification file in public directory');
    
  } catch (error) {
    console.error('Error during Vercel build script:', error);
  }
} else {
  console.log('Not running in Vercel environment, skipping...');
}

console.log('Vercel build script completed');