#!/bin/bash

# Environment Setup Script for Vercel Free Tier Demo
# This script helps set up environment variables for the demo

set -e

echo "🔧 Setting up Vercel Free Tier Demo Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if .env.local exists
if [ -f ".env.local" ]; then
    print_warning ".env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Create .env.local from template
print_status "Creating .env.local from template..."
cp env.example .env.local

print_success "Environment file created: .env.local"

echo ""
echo "📋 Next Steps:"
echo "1. Go to Vercel Dashboard (https://vercel.com/dashboard)"
echo "2. Create the following storage services:"
echo "   • KV Database (Redis)"
echo "   • Postgres Database"
echo "   • Blob Storage"
echo "3. Copy the connection details to .env.local"
echo "4. Run: npm run deploy"
echo ""
echo "🔧 Environment Variables to Set:"
echo "  • KV_REST_API_URL (from Vercel KV)"
echo "  • KV_REST_API_TOKEN (from Vercel KV)"
echo "  • POSTGRES_URL (from Vercel Postgres)"
echo "  • BLOB_READ_WRITE_TOKEN (from Vercel Blob)"
echo ""
echo "💡 Cursor Agent Commands:"
echo "  • Check env: cat .env.local"
echo "  • Edit env: nano .env.local"
echo "  • Deploy: npm run deploy"
