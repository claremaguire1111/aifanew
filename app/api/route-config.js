// This file contains configuration for API routes to ensure they work correctly in Vercel's serverless environment

// Configuration for API routes
export const config = {
  // Enable NodeJS runtime for all API routes
  runtime: 'nodejs',
  
  // Increase body size limit to accommodate larger payloads (like base64 images)
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: false,
  },
  
  // Make sure routes are not statically optimized
  unstable_allowDynamic: [
    // Allow all files in the api directory to be dynamic
    '/app/api/**',
  ],
};