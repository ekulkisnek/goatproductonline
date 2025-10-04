# Cursor Background Agent Guide

This guide explains how to use Cursor's background agent to manage and deploy the Vercel Free Tier Demo site.

## 🎯 Quick Start for Cursor Agent

### One-Command Deploy
```bash
npm run deploy
```

### One-Command Add Feature
```bash
# Add new API endpoint
echo 'export async function GET() { return Response.json({ message: "Hello World" }) }' > app/api/hello/route.ts && npm run deploy

# Add new page
echo 'export default function HelloPage() { return <div>Hello World</div> }' > app/hello/page.tsx && npm run deploy

# Add static file
echo "Hello World" > public/hello.txt && npm run deploy
```

## 🔧 Cursor Agent Commands

### Deploy Commands
```bash
# Deploy to production
npm run deploy

# Deploy preview
npm run deploy-preview

# Check deployment status
vercel ls
```

### Development Commands
```bash
# Start development server
npm run dev

# Build project
npm run build

# Run linting
npm run lint
```

### File Management
```bash
# Add API route
mkdir -p app/api/new-route
echo 'export async function GET() { return Response.json({ message: "New Route" }) }' > app/api/new-route/route.ts

# Add page
mkdir -p app/new-page
echo 'export default function NewPage() { return <div>New Page</div> }' > app/new-page/page.tsx

# Add static file
echo "New content" > public/new-file.txt
```

### Database Operations
```bash
# Test KV database
curl https://your-domain.vercel.app/api/kv-demo

# Test Postgres database
curl https://your-domain.vercel.app/api/postgres-demo

# Test Blob storage
curl -X POST -F "file=@example.txt" https://your-domain.vercel.app/api/blob-demo
```

## 🚀 Automated Workflows

### Complete Site Update
```bash
# Update main page
echo 'export default function Home() { return <div>Updated Home Page</div> }' > app/page.tsx

# Add new feature
echo 'export async function GET() { return Response.json({ feature: "new" }) }' > app/api/new-feature/route.ts

# Deploy everything
npm run deploy
```

### Environment Setup
```bash
# Setup environment
./scripts/setup-env.sh

# Deploy with environment
./scripts/deploy.sh
```

### Monitoring
```bash
# Check status
curl https://your-domain.vercel.app/api/status

# View analytics
curl https://your-domain.vercel.app/api/analytics-demo

# Check logs
vercel logs
```

## 📁 File Structure for Cursor Agent

```
vercelhostingtests/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes (Serverless Functions)
│   │   └── [endpoint]/     # Create new endpoints here
│   ├── [page]/             # Create new pages here
│   └── globals.css         # Global styles
├── public/                 # Static files
│   └── [filename]          # Add static files here
├── scripts/                # Automation scripts
│   ├── deploy.sh          # Deployment script
│   └── setup-env.sh       # Environment setup
├── middleware.ts          # Edge middleware
├── package.json           # Dependencies
└── README.md              # Documentation
```

## 🎯 Common Cursor Agent Tasks

### 1. Add New API Endpoint
```bash
# Create endpoint directory
mkdir -p app/api/my-endpoint

# Create route handler
echo 'export async function GET() { return Response.json({ message: "My Endpoint" }) }' > app/api/my-endpoint/route.ts

# Deploy
npm run deploy
```

### 2. Add New Page
```bash
# Create page directory
mkdir -p app/my-page

# Create page component
echo 'export default function MyPage() { return <div>My Page</div> }' > app/my-page/page.tsx

# Deploy
npm run deploy
```

### 3. Add Static File
```bash
# Add static file
echo "My static content" > public/my-file.txt

# Deploy
npm run deploy
```

### 4. Update Existing File
```bash
# Update main page
echo 'export default function Home() { return <div>Updated Home</div> }' > app/page.tsx

# Deploy
npm run deploy
```

### 5. Add Database Integration
```bash
# Create database endpoint
mkdir -p app/api/database

# Create database handler
echo 'export async function GET() { return Response.json({ database: "connected" }) }' > app/api/database/route.ts

# Deploy
npm run deploy
```

## 🔄 Continuous Deployment

### Git-Based Deployment
1. Push changes to connected repository
2. Vercel automatically deploys
3. No manual intervention needed

### CLI-Based Deployment
```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## 📊 Monitoring and Debugging

### Check Deployment Status
```bash
# List deployments
vercel ls

# Check specific deployment
vercel inspect [deployment-url]
```

### View Logs
```bash
# View all logs
vercel logs

# View function logs
vercel logs --function=api/status

# View recent logs
vercel logs --limit=50
```

### Test Endpoints
```bash
# Test health check
curl https://your-domain.vercel.app/api/status

# Test custom endpoint
curl https://your-domain.vercel.app/api/your-endpoint

# Test with POST
curl -X POST https://your-domain.vercel.app/api/your-endpoint -d '{"data": "test"}'
```

## 🛠️ Environment Management

### Setup Environment
```bash
# Copy environment template
cp env.example .env.local

# Edit environment variables
nano .env.local

# Deploy with environment
npm run deploy
```

### Environment Variables
```bash
# Add environment variable
vercel env add VARIABLE_NAME

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VARIABLE_NAME
```

## 🎯 Best Practices for Cursor Agent

### 1. Always Test Locally First
```bash
# Start development server
npm run dev

# Test endpoints
curl http://localhost:3000/api/status
```

### 2. Use Incremental Deployments
```bash
# Deploy preview first
npm run deploy-preview

# Test preview deployment
curl https://preview-url.vercel.app/api/status

# Deploy to production
npm run deploy
```

### 3. Monitor Deployments
```bash
# Check deployment status
vercel ls

# View logs if issues
vercel logs --limit=20
```

### 4. Use Environment Variables
```bash
# Setup environment
./scripts/setup-env.sh

# Deploy with environment
./scripts/deploy.sh
```

## 🆘 Troubleshooting

### Common Issues
1. **Build fails**: Check `npm run build` output
2. **Deployment fails**: Check `vercel logs`
3. **Environment issues**: Check `.env.local` file
4. **Database connection**: Verify credentials

### Debug Commands
```bash
# Check build
npm run build

# Check deployment
vercel ls

# Check logs
vercel logs --limit=50

# Check environment
vercel env ls
```

## 📚 Additional Resources

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Cursor AI Documentation](https://cursor.sh/docs)

---

**This guide enables Cursor's background agent to fully manage the Vercel Free Tier Demo site with minimal human intervention.**
