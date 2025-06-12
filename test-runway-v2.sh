#\!/bin/bash

# Read the API key from .env.local
API_KEY=$(grep RUNWAY_API_KEY .env.local | cut -d '=' -f2)

echo "API Key starts with: ${API_KEY:0:10}..."

# Try version 2 of the API
echo -e "\nTesting with explicit v2 version..."
curl -s -X GET "https://api.runwayml.com/v2/models" \
  -H "Authorization: Bearer $API_KEY" 

# Try with the current key format
echo -e "\n\nTesting with current key format (no Bearer)..."
curl -s -X GET "https://api.runwayml.com/v2/models" \
  -H "Authorization: $API_KEY" 
