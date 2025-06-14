#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# AWS Instance details
AWS_IP="3.142.239.155"
SSH_USER="ec2-user"
SSH_KEY="~/.ssh/id_rsa"
BACKEND_DIR="/Users/claremaguire/aifanew/backend"
REMOTE_DIR="/home/ec2-user/runway-api-backend"

echo -e "${YELLOW}=== AIFA RunwayML API Backend Deployment ===${NC}"
echo -e "${YELLOW}This script will deploy the backend to AWS instance ${AWS_IP}${NC}"
echo ""

# Ask for API key (securely)
read -sp "Enter your RunwayML API key: " RUNWAY_API_KEY
echo ""

# Check SSH connection
echo -e "${YELLOW}Checking SSH connection to AWS instance...${NC}"
ssh -q -i $SSH_KEY $SSH_USER@$AWS_IP exit
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to connect to AWS instance. Please check your SSH credentials and server status.${NC}"
  exit 1
fi
echo -e "${GREEN}SSH connection successful!${NC}"

# Create remote directory if it doesn't exist
echo -e "${YELLOW}Creating remote directory...${NC}"
ssh -i $SSH_KEY $SSH_USER@$AWS_IP "mkdir -p $REMOTE_DIR"

# Copy backend files to AWS instance
echo -e "${YELLOW}Copying backend files to AWS instance...${NC}"
rsync -avz --exclude 'node_modules' -e "ssh -i $SSH_KEY" $BACKEND_DIR/ $SSH_USER@$AWS_IP:$REMOTE_DIR/
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to copy files to AWS instance.${NC}"
  exit 1
fi
echo -e "${GREEN}Files copied successfully!${NC}"

# Install dependencies
echo -e "${YELLOW}Installing dependencies on AWS instance...${NC}"
ssh -i $SSH_KEY $SSH_USER@$AWS_IP << EOF
  cd $REMOTE_DIR
  
  # Check if Node.js is installed, install if not
  if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -sL https://rpm.nodesource.com/setup_18.x | sudo -E bash -
    sudo yum install -y nodejs
  fi
  
  # Install npm dependencies
  npm install
  
  # Install PM2 globally if not installed
  if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
  fi
EOF
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to install dependencies.${NC}"
  exit 1
fi
echo -e "${GREEN}Dependencies installed successfully!${NC}"

# Create .env file with API key
echo -e "${YELLOW}Setting up environment variables...${NC}"
ssh -i $SSH_KEY $SSH_USER@$AWS_IP << EOF
  cd $REMOTE_DIR
  echo "RUNWAY_API_KEY=$RUNWAY_API_KEY" > .env
  echo "PORT=3001" >> .env
EOF
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to set up environment variables.${NC}"
  exit 1
fi
echo -e "${GREEN}Environment variables set up successfully!${NC}"

# Configure firewall
echo -e "${YELLOW}Configuring firewall...${NC}"
ssh -i $SSH_KEY $SSH_USER@$AWS_IP << EOF
  # Check if iptables is installed
  if ! command -v iptables &> /dev/null; then
    sudo yum install -y iptables-services
    sudo systemctl enable iptables
    sudo systemctl start iptables
  fi
  
  # Allow traffic on port 3001
  sudo iptables -C INPUT -p tcp --dport 3001 -j ACCEPT 2>/dev/null || sudo iptables -A INPUT -p tcp --dport 3001 -j ACCEPT
  sudo service iptables save
EOF
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}Warning: Failed to configure firewall. You may need to manually allow traffic on port 3001.${NC}"
fi
echo -e "${GREEN}Firewall configured successfully!${NC}"

# Start the server with PM2
echo -e "${YELLOW}Starting server with PM2...${NC}"
ssh -i $SSH_KEY $SSH_USER@$AWS_IP << EOF
  cd $REMOTE_DIR
  pm2 stop runway-api-backend || true
  pm2 delete runway-api-backend || true
  pm2 start server.js --name runway-api-backend
  pm2 save
  
  # Configure PM2 to start on system boot
  pm2 startup | tail -n 1 > startup.sh
  chmod +x startup.sh
  ./startup.sh
EOF
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to start server with PM2.${NC}"
  exit 1
fi
echo -e "${GREEN}Server started successfully with PM2!${NC}"

# Test the deployment
echo -e "${YELLOW}Testing deployment...${NC}"
sleep 5 # Give the server a moment to start
curl -s http://$AWS_IP:3001/ | grep -q "RunwayML API proxy server is running"
if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment test failed. Server may not be running correctly.${NC}"
  echo -e "${YELLOW}Try accessing http://$AWS_IP:3001/ manually to check the status.${NC}"
  exit 1
fi
echo -e "${GREEN}Deployment test successful! The server is running.${NC}"

echo ""
echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo -e "The backend is now running at ${GREEN}http://$AWS_IP:3001${NC}"
echo -e "The Dulwich page has been updated to use this backend server."
echo -e "${YELLOW}Note: Make sure AWS security groups allow inbound traffic on port 3001${NC}"
