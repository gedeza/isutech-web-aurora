#!/bin/bash

# AutoSlip Onboarding API - VPS Deployment Script
# Deploys the backend API to VPS at 46.224.40.5

set -e  # Exit on any error

VPS_HOST="root@46.224.40.5"
VPS_PATH="/opt/isutech-onboarding-api"
PROJECT_NAME="isutech-onboarding-api"

echo "🚀 Starting deployment to VPS (46.224.40.5)..."

# Step 1: Create directory structure on VPS
echo "📁 Creating directory structure on VPS..."
ssh $VPS_HOST "mkdir -p $VPS_PATH"

# Step 2: Copy server files to VPS
echo "📤 Copying server files to VPS..."
rsync -avz --exclude 'node_modules' --exclude 'data' --exclude 'exports' --exclude '.env' \
  ../server/ $VPS_HOST:$VPS_PATH/

# Step 3: Copy package.json and install dependencies
echo "📦 Installing dependencies on VPS..."
scp ../package.json $VPS_HOST:$VPS_PATH/
ssh $VPS_HOST "cd $VPS_PATH && npm install --production"

# Step 4: Copy .env file if it exists locally
if [ -f ../.env ]; then
  echo "🔐 Copying environment variables..."
  scp ../.env $VPS_HOST:$VPS_PATH/.env
else
  echo "⚠️  No .env file found. You'll need to create it manually on VPS."
fi

# Step 5: Set up PM2 to run the server
echo "🔧 Setting up PM2 service..."
ssh $VPS_HOST << 'ENDSSH'
cd /opt/isutech-onboarding-api

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi

# Stop existing process if running
pm2 stop isutech-onboarding-api || true
pm2 delete isutech-onboarding-api || true

# Start the API server with PM2
pm2 start index.js --name isutech-onboarding-api --time

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup || true

# Show status
pm2 status
ENDSSH

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📊 API Status:"
ssh $VPS_HOST "pm2 status"
echo ""
echo "📝 API Endpoints:"
echo "   Health Check: http://46.224.40.5:3001/api/health"
echo "   Onboarding:   http://46.224.40.5:3001/api/autoslip/onboarding"
echo ""
echo "🔍 View logs with: ssh $VPS_HOST 'pm2 logs isutech-onboarding-api'"
echo "🔄 Restart with:   ssh $VPS_HOST 'pm2 restart isutech-onboarding-api'"
echo "🛑 Stop with:      ssh $VPS_HOST 'pm2 stop isutech-onboarding-api'"
echo ""
