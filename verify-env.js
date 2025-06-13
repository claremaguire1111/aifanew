// Script to verify environment variables
// Run this on Vercel to debug environment variable issues

// Print current environment
console.log('=== Environment Variables Check ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL:', process.env.VERCEL ? 'Yes' : 'No');
console.log('VERCEL_ENV:', process.env.VERCEL_ENV);

// Check for required API keys (without revealing full keys)
const requiredVars = ['RUNWAY_API_KEY', 'DULWICH_PASSWORD'];
const optionalVars = ['OPENAI_API_KEY'];

console.log('\n=== Required Variables ===');
requiredVars.forEach(key => {
  const value = process.env[key];
  if (!value) {
    console.log(`❌ ${key}: MISSING`);
  } else {
    // Show first 5 and last 5 characters with *** in between
    const maskedValue = 
      value.length > 10 
        ? `${value.substring(0, 5)}...${value.substring(value.length - 5)}`
        : '[too short to mask]';
    console.log(`✅ ${key}: ${maskedValue}`);
  }
});

console.log('\n=== Optional Variables ===');
optionalVars.forEach(key => {
  const value = process.env[key];
  if (!value) {
    console.log(`⚠️ ${key}: Not set`);
  } else {
    console.log(`✅ ${key}: Set`);
  }
});

// Check Next.js specific environment variables
console.log('\n=== Next.js Environment ===');
console.log('NEXT_PUBLIC vars:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));

// Print out env for debug in Next.js config
console.log('\n=== Env Object in next.config.ts ===');
const nextEnv = {
  NEXT_PUBLIC_DULWICH_PASSWORD: process.env.DULWICH_PASSWORD,
  RUNWAY_API_KEY: process.env.RUNWAY_API_KEY ? '[SET]' : '[MISSING]',
};
console.log(nextEnv);

// Check if we can run a simple fetch to test network
console.log('\n=== Network Test ===');
fetch('https://api.runwayml.com/v1/organization', {
  headers: {
    'Authorization': `Bearer ${process.env.RUNWAY_API_KEY || 'missing-key'}`,
  }
})
.then(response => {
  console.log('Network test status:', response.status);
  return response.json().catch(() => ({ error: 'Failed to parse JSON' }));
})
.then(data => {
  console.log('Network test response:', JSON.stringify(data).substring(0, 100) + '...');
})
.catch(error => {
  console.error('Network test error:', error.message);
});

// Exit with success after all tests
console.log('\n=== Test Complete ===');