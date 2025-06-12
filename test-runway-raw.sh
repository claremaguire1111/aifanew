#\!/bin/bash

# Get API key from environment variable or .env.local file
if [ -z "$RUNWAY_API_KEY" ]; then
  RUNWAY_API_KEY=$(grep RUNWAY_API_KEY .env.local | cut -d '=' -f2)
fi

echo "Testing Runway API with key starting with: ${RUNWAY_API_KEY:0:10}..."

# Test API access with verbose output
echo -e "\n1. Testing authentication..."
curl -v -X GET "https://api.runwayml.com/v1/user" \
  -H "Authorization: Bearer $RUNWAY_API_KEY"

echo -e "\n\n2. Testing with a different endpoint format..."
curl -v -X GET "https://api.runwayml.com/v1/models" \
  -H "Authorization: Bearer $RUNWAY_API_KEY"
