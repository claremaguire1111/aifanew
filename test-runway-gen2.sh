#\!/bin/bash

# Get API key from environment variable or .env.local file
if [ -z "$RUNWAY_API_KEY" ]; then
  RUNWAY_API_KEY=$(grep RUNWAY_API_KEY .env.local | cut -d '=' -f2)
fi

echo "Testing Runway API with key starting with: ${RUNWAY_API_KEY:0:10}..."

# Try to create an upload URL
echo -e "\nCreating upload URL..."
curl -s -X POST "https://api.runwayml.com/v1/uploads" \
  -H "Authorization: Bearer $RUNWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type": "image/jpeg", "desiredInfo": {"generatedMetaData": true}}'

# List generations
echo -e "\n\nListing generations..."
curl -s -X GET "https://api.runwayml.com/v1/generationJobs" \
  -H "Authorization: Bearer $RUNWAY_API_KEY"

