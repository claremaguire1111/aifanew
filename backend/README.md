# RunwayML API Backend

This is a dedicated backend service for handling RunwayML API integration. It provides a reliable interface between your frontend and the RunwayML API, with enhanced error handling and retry mechanisms.

## Why a Separate Backend?

Next.js API routes can sometimes behave differently in development versus production, especially when deployed to serverless platforms like Vercel. This dedicated Express backend provides a more consistent environment for handling the RunwayML API integration.

## Features

- Robust error handling and multiple authentication methods
- Support for different API endpoint formats
- Automatic retries with different payload structures
- Proper CORS handling for cross-origin requests
- Environment variable configuration
- Dockerized for easy deployment

## Getting Started

### Local Development

1. Create a `.env` file (copy from `.env.example`) and add your RunwayML API key
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm run dev
   ```
4. The server will be available at `http://localhost:3001`

### Deployment Options

#### Option 1: Deploy to Vercel

1. Push this directory to a GitHub repository
2. Connect the repository to Vercel
3. Set the environment variables in the Vercel dashboard
4. Set the Root Directory to `/backend`
5. Deploy!

#### Option 2: Deploy using Docker

1. Build the Docker image:
   ```
   docker build -t runway-api-backend .
   ```
2. Run the container:
   ```
   docker run -p 3001:3001 --env-file .env runway-api-backend
   ```

#### Option 3: Deploy to Heroku

1. Create a new Heroku app
2. Set the environment variables in the Heroku dashboard
3. Deploy using the Heroku CLI or GitHub integration

## API Endpoints

### POST /api/create

Creates a new image-to-video task.

**Request Body:**
```json
{
  "base64Image": "data:image/jpeg;base64,...",
  "promptText": "Make the sculpture dance",
  "model": "gen4_turbo",
  "ratio": "1280:720",
  "duration": 5
}
```

**Response:**
```json
{
  "id": "task-id",
  "status": "PENDING"
}
```

### GET /api/status?taskId=xxx

Checks the status of a task.

**Response:**
```json
{
  "id": "task-id",
  "status": "SUCCEEDED",
  "output": ["https://url-to-video.mp4"]
}
```

## Configuration

The following environment variables can be configured:

- `RUNWAY_API_KEY` - Your RunwayML API key
- `PORT` - The port to run the server on (default: 3001)
- `CORS_ORIGIN` - CORS origin to allow (default: *)

## Frontend Integration

Update your frontend to use the backend URL instead of the Next.js API routes:

```javascript
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-backend-url.com';

// Create a task
const response = await fetch(`${backendUrl}/api/create`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
});

// Check task status
const statusResponse = await fetch(`${backendUrl}/api/status?taskId=${taskId}`, {
  method: 'GET'
});
```