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
DOMAIN_NAME="runway-api.aifilm.academy"  # Change this to your actual domain that points to the AWS IP

echo -e "${YELLOW}=== Setting up SSL for RunwayML API Backend ===${NC}"
echo -e "${YELLOW}This script will set up SSL with Let's Encrypt for ${DOMAIN_NAME}${NC}"
echo ""

# Check if a domain name was provided
if [ -z "$DOMAIN_NAME" ]; then
  echo -e "${RED}Error: Please edit this script to provide a domain name that points to your AWS instance.${NC}"
  exit 1
fi

# Check SSH connection
echo -e "${YELLOW}Checking SSH connection to AWS instance...${NC}"
ssh -q -i $SSH_KEY $SSH_USER@$AWS_IP exit
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to connect to AWS instance. Please check your SSH credentials and server status.${NC}"
  exit 1
fi
echo -e "${GREEN}SSH connection successful!${NC}"

# Install Nginx and Certbot
echo -e "${YELLOW}Installing Nginx and Certbot...${NC}"
ssh -i $SSH_KEY $SSH_USER@$AWS_IP << EOF
  # Install Nginx
  if ! command -v nginx &> /dev/null; then
    sudo amazon-linux-extras install -y nginx1
    sudo systemctl enable nginx
    sudo systemctl start nginx
  fi
  
  # Install Certbot and Nginx plugin
  if ! command -v certbot &> /dev/null; then
    sudo amazon-linux-extras install -y epel
    sudo yum install -y certbot python-certbot-nginx
  fi
EOF
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to install Nginx and Certbot.${NC}"
  exit 1
fi
echo -e "${GREEN}Nginx and Certbot installed successfully!${NC}"

# Configure Nginx
echo -e "${YELLOW}Configuring Nginx...${NC}"
ssh -i $SSH_KEY $SSH_USER@$AWS_IP << EOF
  # Create Nginx configuration file
  sudo tee /etc/nginx/conf.d/runway-api.conf > /dev/null << 'EOL'
server {
    listen 80;
    server_name ${DOMAIN_NAME};

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL

  # Test Nginx configuration
  sudo nginx -t
  
  # Reload Nginx
  sudo systemctl reload nginx
EOF
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to configure Nginx.${NC}"
  exit 1
fi
echo -e "${GREEN}Nginx configured successfully!${NC}"

# Open ports 80 and 443 in the firewall
echo -e "${YELLOW}Opening ports 80 and 443 in the firewall...${NC}"
ssh -i $SSH_KEY $SSH_USER@$AWS_IP << EOF
  # Allow HTTP and HTTPS traffic
  sudo iptables -C INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null || sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
  sudo iptables -C INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null || sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
  sudo service iptables save
EOF
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}Warning: Failed to configure firewall. You may need to manually open ports 80 and 443.${NC}"
fi
echo -e "${GREEN}Firewall ports opened successfully!${NC}"

# Get SSL certificate with Certbot
echo -e "${YELLOW}Obtaining SSL certificate with Let's Encrypt...${NC}"
echo -e "${YELLOW}NOTE: Make sure your domain ${DOMAIN_NAME} is pointing to ${AWS_IP} before continuing.${NC}"
read -p "Is the domain correctly configured? (y/n): " domain_ready
if [[ "$domain_ready" != "y" && "$domain_ready" != "Y" ]]; then
  echo -e "${RED}Aborting SSL setup. Please configure your domain and run this script again.${NC}"
  exit 1
fi

ssh -i $SSH_KEY $SSH_USER@$AWS_IP << EOF
  # Get SSL certificate
  sudo certbot --nginx -d ${DOMAIN_NAME} --non-interactive --agree-tos --email aifa@aifilm.academy --redirect
EOF
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to obtain SSL certificate. Please check that your domain is correctly configured.${NC}"
  exit 1
fi
echo -e "${GREEN}SSL certificate obtained and Nginx configured for HTTPS!${NC}"

# Update environment variable in .env.local to use HTTPS URL
echo -e "${YELLOW}Updating .env.local to use HTTPS URL...${NC}"
sed -i '' "s|NEXT_PUBLIC_BACKEND_URL=http://${AWS_IP}:3001|NEXT_PUBLIC_BACKEND_URL=https://${DOMAIN_NAME}|g" .env.local
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to update .env.local. Please update it manually to use https://${DOMAIN_NAME}${NC}"
fi
echo -e "${GREEN}Environment variable updated to use HTTPS URL!${NC}"

# Update Dulwich page code to use HTTPS URL
echo -e "${YELLOW}Updating Dulwich page to use HTTPS URL...${NC}"
sed -i '' "s|http://${AWS_IP}:3001|https://${DOMAIN_NAME}|g" app/dulwich/page.js
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to update Dulwich page. Please update it manually to use https://${DOMAIN_NAME}${NC}"
fi
echo -e "${GREEN}Dulwich page updated to use HTTPS URL!${NC}"

# Final instructions
echo ""
echo -e "${GREEN}=== SSL Setup Complete ===${NC}"
echo -e "The backend is now running with HTTPS at ${GREEN}https://${DOMAIN_NAME}${NC}"
echo -e "The Dulwich page has been updated to use this secure URL."
echo -e "${YELLOW}Note: SSL certificates will auto-renew every 90 days.${NC}"
echo -e "${YELLOW}Important: Make sure your AWS security groups allow inbound traffic on ports 80 and 443${NC}"