// This script runs during Vercel build to ensure all image directories are copied correctly
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('Running Vercel build script to ensure images are copied correctly...');

// Log the current directory and environment
console.log(`Current directory: ${__dirname}`);
console.log(`Environment variables: ${JSON.stringify(process.env.VERCEL_ENV || 'Not in Vercel')}`);

try {
  // Define the paths
  const publicDir = path.join(__dirname, 'public');
  const socialDir = path.join(publicDir, 'images', 'social');
  const supportDir = path.join(publicDir, 'images', 'support');
  
  // List the contents of the public directory
  console.log('Contents of public directory:');
  const publicContents = fs.readdirSync(publicDir);
  console.log(publicContents);
  
  // List the contents of the public/images directory
  console.log('Contents of public/images directory:');
  const imagesDir = path.join(publicDir, 'images');
  if (fs.existsSync(imagesDir)) {
    const imagesContents = fs.readdirSync(imagesDir);
    console.log(imagesContents);
  } else {
    console.log('public/images directory does not exist');
  }
  
  // Verify the source directories exist
  if (fs.existsSync(socialDir)) {
    console.log(`Found social images directory: ${socialDir}`);
    
    // List files to verify
    const socialFiles = fs.readdirSync(socialDir);
    console.log('Social files:', socialFiles);
    
    // Count the files
    console.log(`Total social images: ${socialFiles.length}`);
    
    // Ensure the files are readable
    const testFile = path.join(socialDir, socialFiles[0]);
    try {
      const stats = fs.statSync(testFile);
      console.log(`Test file ${testFile} size: ${stats.size} bytes`);
      
      // Try to read the first few bytes of the file
      const buffer = Buffer.alloc(10);
      const fd = fs.openSync(testFile, 'r');
      fs.readSync(fd, buffer, 0, 10, 0);
      fs.closeSync(fd);
      console.log(`First bytes: ${buffer.toString('hex')}`);
    } catch (err) {
      console.error(`Error reading test file: ${err.message}`);
    }
  } else {
    console.error('WARNING: Social images directory not found!');
  }
  
  if (fs.existsSync(supportDir)) {
    console.log(`Found support images directory: ${supportDir}`);
    
    // List files to verify
    const supportFiles = fs.readdirSync(supportDir);
    console.log('Support files:', supportFiles);
  } else {
    console.error('WARNING: Support images directory not found!');
  }
  
  // Copy images to the output directory if we're in Vercel
  const outputDir = process.env.VERCEL_OUTPUT_DIR || path.join(__dirname, '.next/static');
  console.log(`Output directory: ${outputDir}`);
  
  if (!fs.existsSync(outputDir)) {
    console.log(`Creating output directory: ${outputDir}`);
    fs.ensureDirSync(outputDir);
  }
  
  // Create images directory in output
  const outputImagesDir = path.join(outputDir, 'images');
  fs.ensureDirSync(outputImagesDir);
  
  // Copy social images
  if (fs.existsSync(socialDir)) {
    const outputSocialDir = path.join(outputImagesDir, 'social');
    fs.ensureDirSync(outputSocialDir);
    fs.copySync(socialDir, outputSocialDir);
    console.log(`Copied social images to ${outputSocialDir}`);
  }
  
  // Copy support images
  if (fs.existsSync(supportDir)) {
    const outputSupportDir = path.join(outputImagesDir, 'support');
    fs.ensureDirSync(outputSupportDir);
    fs.copySync(supportDir, outputSupportDir);
    console.log(`Copied support images to ${outputSupportDir}`);
  }
  
  // Create a verification file to indicate this script ran
  const verificationContent = `
    Social and Support image directories verified and copied at build time
    Timestamp: ${new Date().toISOString()}
  `;
  
  fs.writeFileSync(path.join(publicDir, 'image-verification.txt'), verificationContent);
  console.log('Created verification file in public directory');
  
  // Try to use find to locate image files
  try {
    console.log('Running find command to locate image files:');
    const findOutput = execSync('find . -path "*/images/social/*" -type f | head -5').toString();
    console.log(findOutput);
  } catch (err) {
    console.log('Find command failed:', err.message);
  }
  
} catch (error) {
  console.error('Error during Vercel build script:', error);
}

console.log('Vercel build script completed');