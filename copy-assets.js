const fs = require('fs-extra');
const path = require('path');

// Define source and destination directories
const publicDir = path.join(__dirname, 'public');
const outDir = path.join(__dirname, 'out');
const socialDir = path.join(publicDir, 'images/social');
const supportDir = path.join(publicDir, 'images/support');

// Create destination directories in the out folder
const outSocialDir = path.join(outDir, 'images/social');
const outSupportDir = path.join(outDir, 'images/support');

console.log('Copying critical image folders to static export directory...');

// Ensure the destination directories exist
fs.ensureDirSync(path.join(outDir, 'images'));
fs.ensureDirSync(outSocialDir);
fs.ensureDirSync(outSupportDir);

// Copy the files
try {
  fs.copySync(socialDir, outSocialDir);
  console.log('Successfully copied social images folder!');
} catch (err) {
  console.error('Error copying social images folder:', err);
}

try {
  fs.copySync(supportDir, outSupportDir);
  console.log('Successfully copied support images folder!');
} catch (err) {
  console.error('Error copying support images folder:', err);
}

// Create a verification file to confirm the copy worked
fs.writeFileSync(path.join(outDir, 'images/verification.txt'), 'Images were copied by copy-assets.js script', 'utf8');

console.log('Image folders copied successfully!');