# AWS Deployment Guide for RunwayML API Backend

This guide explains how to deploy the RunwayML API backend to an AWS EC2 instance to make it work reliably in production.

## AWS Instance Details

- **IP Address**: 3.142.239.155
- **User**: ec2-user
- **SSH Key**: Located at ~/.ssh/id_rsa

## Why Deploy to AWS?

Using a dedicated AWS instance for the RunwayML API has several advantages:

1. **Reliability**: Avoids timeout issues that can occur with serverless functions
2. **Consistency**: Provides a consistent environment for API requests
3. **Control**: Gives you more control over server configuration and error handling
4. **Performance**: Can improve response times and handle larger payloads

## Deployment Instructions

We've created two scripts to simplify the deployment process:

### 1. Deploy the Backend Server

Run the deployment script from the project root:

```bash
./deploy-backend.sh
```

This script will:
- Copy the backend files to the AWS instance
- Install Node.js and dependencies
- Set up environment variables with your RunwayML API key
- Configure the firewall to allow traffic on port 3001
- Start the server with PM2 (process manager)
- Test the deployment to ensure it's working

### 2. Set Up SSL (Optional but Recommended)

If you have a domain name pointing to your AWS instance, you can set up SSL with Let's Encrypt:

```bash
./setup-ssl.sh
```

This script will:
- Install Nginx and Certbot
- Configure Nginx as a reverse proxy to your Node.js application
- Obtain an SSL certificate from Let's Encrypt
- Update the environment variables and code to use HTTPS

## Verifying the Deployment

After deployment, you can verify that the backend is running correctly:

1. Check the health endpoint:
   ```
   curl http://3.142.239.155:3001/
   ```

2. Verify the API endpoints are accessible:
   ```
   curl -X POST http://3.142.239.155:3001/api/create -H "Content-Type: application/json" -d '{"test": true}'
   ```

## Connecting the Dulwich Page to the AWS Backend

The Dulwich page has been updated to use the AWS backend:

```javascript
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://3.142.239.155:3001';
```

The environment variable `NEXT_PUBLIC_BACKEND_URL` has been set in `.env.local` to ensure that the application uses the AWS backend in all environments.

## Troubleshooting

If you encounter issues with the deployment:

1. **Check the server logs**:
   ```
   ssh -i ~/.ssh/id_rsa ec2-user@3.142.239.155
   pm2 logs runway-api-backend
   ```

2. **Verify the server is running**:
   ```
   ssh -i ~/.ssh/id_rsa ec2-user@3.142.239.155
   pm2 status
   ```

3. **Check that the port is open in AWS security groups**:
   - Go to the AWS Console
   - Navigate to EC2 > Security Groups
   - Find the security group attached to your instance
   - Ensure that inbound rules allow traffic on port 3001 (or 80/443 if using Nginx)

## Maintenance

To update the backend code:

1. Make your changes locally
2. Run the deployment script again:
   ```
   ./deploy-backend.sh
   ```

The script will automatically update the code and restart the server.