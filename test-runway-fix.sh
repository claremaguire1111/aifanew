#\!/bin/bash

# Get API key from environment variable or .env.local file
if [ -z "$RUNWAY_API_KEY" ]; then
  RUNWAY_API_KEY=$(grep RUNWAY_API_KEY .env.local | cut -d '=' -f2)
fi

echo "Testing Runway API with key..."

# Check if key looks like a JWT (starts with ey)
if [[ \! "$RUNWAY_API_KEY" =~ ^ey ]]; then
  echo -e "\n⚠️ WARNING: API key doesn't appear to be in JWT format (should start with 'ey')"
  echo "Current format: ${RUNWAY_API_KEY:0:10}..."
  echo "Runway API keys should look like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
  echo -e "\nPlease get a valid API key from https://app.runwayml.com/ -> Profile -> API Keys\n"
fi

# Try to create an upload URL with different auth formats
echo -e "\nTrying with 'Bearer' prefix..."
curl -s -X POST "https://api.runwayml.com/v1/uploads" \
  -H "Authorization: Bearer $RUNWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type": "image/jpeg"}'

echo -e "\n\nTrying without 'Bearer' prefix..."
curl -s -X POST "https://api.runwayml.com/v1/uploads" \
  -H "Authorization: $RUNWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type": "image/jpeg"}'

