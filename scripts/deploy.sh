#!/bin/bash

# Vercel Free Tier Demo - Deployment Script
# This script automates the deployment process for Cursor background agent

set -e

echo "🚀 Starting Vercel Free Tier Demo Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel@latest
fi

print_status "Installing dependencies..."
npm install

print_status "Running build..."
npm run build

print_status "Running linting..."
npm run lint

print_status "Deploying to Vercel..."
vercel --prod --yes

print_success "Deployment completed successfully!"
print_status "Your site is now live at: https://vercel-free-tier-demo.vercel.app"

# Display useful information
echo ""
echo "📋 Deployment Summary:"
echo "  • Framework: Next.js"
echo "  • Runtime: Node.js"
echo "  • Environment: Production"
echo "  • Features: All Vercel free tier features enabled"
echo ""
echo "🔧 Cursor Agent Commands:"
echo "  • Deploy: npm run deploy"
echo "  • Preview: npm run deploy-preview"
echo "  • Status: vercel ls"
echo "  • Logs: vercel logs"
echo ""
echo "🌐 Quick Links:"
echo "  • Main Site: https://vercel-free-tier-demo.vercel.app"
echo "  • API Status: https://vercel-free-tier-demo.vercel.app/api/status"
echo "  • Analytics: https://vercel-free-tier-demo.vercel.app/analytics-demo"
echo "  • Static Demo: https://vercel-free-tier-demo.vercel.app/static-demo"
