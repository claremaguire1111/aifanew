#\!/bin/bash

# Read the API key from .env.local
API_KEY=$(grep RUNWAY_API_KEY .env.local | cut -d '=' -f2)

echo "API Key starts with: ${API_KEY:0:10}..."

# Try to create an upload URL with bearer token
echo -e "\nTesting API with 'Bearer' prefix..."
curl -s -X POST "https://api.runwayml.com/v1/uploads" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type": "image/jpeg"}'

echo -e "\n\nInfo about getting a valid API key:"
echo "1. Go to https://app.runwayml.com/"
echo "2. Log in to your account"
echo "3. Click on your profile in the top right"
echo "4. Select 'API Keys'"
echo "5. Create a new API key specifically for this project"
echo "6. The key should start with 'ey'"
