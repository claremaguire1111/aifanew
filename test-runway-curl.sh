#!/bin/bash

# Get API key from .env.local file
API_KEY=$(grep RUNWAY_API_KEY .env.local | cut -d '=' -f2)

echo "Using API key starting with: ${API_KEY:0:10}..."

echo -e "\nTesting organization endpoint with curl:"
curl -s -X GET "https://api.runwayml.com/v1/organization" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "X-Runway-Version: 2024-11-06"

echo -e "\n\nTrying an image generation with curl:"
curl -s -X POST "https://api.runwayml.com/v1/text_to_image" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -H "X-Runway-Version: 2024-11-06" \
  -d '{
    "promptText": "A beautiful park with sculptures",
    "ratio": "1024:1024",
    "model": "gen4_image"
  }'