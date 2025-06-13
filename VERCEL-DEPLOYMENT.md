# Vercel Deployment Guide

This document provides important information for deploying this application to Vercel, especially for ensuring the RunwayML API integration works correctly.

## Environment Variables

The following environment variables must be set in your Vercel project settings:

| Variable | Description | Required |
| --- | --- | --- |
| `RUNWAY_API_KEY` | API key for RunwayML | Yes |

Current API key to use: `key_a95f809ef7a01f67d9b386f870e685876d5077e3494e96890b193b3dfd5f85c876266b3489d4087f8bd1638f8f6b3220b91a2b9227e8b303bf3c21b72b63ec07`

## Deployment Verification

After deploying to Vercel, verify that the environment variables are set correctly by visiting:

```
https://your-vercel-domain.vercel.app/api/env-check
```

This endpoint will show if the required environment variables are present (without exposing their values).

## Testing the Dulwich Page

The Dulwich page animation generator should work in production with the following workflow:

1. Upload an image
2. Enter a prompt
3. Click "Generate Animation"

The app will try multiple API routes in sequence:
- `/api/dulwich/create` - Primary API route using multiple API version headers
- `/api/generate-animation` - Fallback route using the RunwayML SDK
- `/api/runway-wrapper` - Additional fallback route

If all API routes fail, the app will display a demo video with an error message.

## Troubleshooting

If the Dulwich page animation generator doesn't work in production:

1. Check if the environment variables are set correctly using the `/api/env-check` endpoint
2. Look for errors in the Vercel Function Logs
3. Verify that the API routes are not timing out (they should complete within the 10-second limit)
4. Make sure the RunwayML API key is valid and has not expired

## Notes on RunwayML API

The RunwayML API is sensitive to the `X-Runway-Version` header. The application tries multiple version headers to maximize compatibility:

- No version header
- `latest`
- `2023-09-26` (known working version)
- `2023-11-06`
- `2024-11-06` (from documentation)

If the RunwayML API changes its versioning requirements, you may need to update the API routes with the new versions.

## Additional Resources

- [RunwayML API Documentation](https://docs.runwayml.com/)
- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)