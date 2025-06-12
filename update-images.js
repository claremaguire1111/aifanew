const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'app/social-maps-forever/page.js');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Replace all remaining image tags with AIFAImage specifically for social and support folders
content = content.replace(
  /<img src="\/images\/social\/([^"]+)"([^>]*)>/g, 
  '<AIFAImage src="/images/social/$1"$2>'
);

content = content.replace(
  /<img src="\/images\/support\/([^"]+)"([^>]*)>/g, 
  '<AIFAImage src="/images/support/$1"$2>'
);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Updated all social and support image tags to AIFAImage');