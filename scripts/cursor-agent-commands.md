# Cursor Background Agent Commands

This document provides all the commands you can use with Cursor's background agent to manage and deploy the Vercel Free Tier Demo site.

## 🚀 Quick Deploy Commands

### Deploy to Production
```bash
npm run deploy
```

### Deploy Preview
```bash
npm run deploy-preview
```

### Check Deployment Status
```bash
vercel ls
```

## 🔧 Development Commands

### Start Development Server
```bash
npm run dev
```

### Build Project
```bash
npm run build
```

### Run Linting
```bash
npm run lint
```

### Install Dependencies
```bash
npm install
```

## 📁 File Management Commands

### Add New API Route
```bash
# Create new API endpoint
mkdir -p app/api/new-endpoint
echo 'export async function GET() { return Response.json({ message: "Hello World" }) }' > app/api/new-endpoint/route.ts
```

### Add New Page
```bash
# Create new page
mkdir -p app/new-page
echo 'export default function NewPage() { return <div>New Page</div> }' > app/new-page/page.tsx
```

### Add Static File
```bash
# Add static file
echo "Hello World" > public/new-file.txt
```

## 🗄️ Database Commands

### Test KV Connection
```bash
curl https://your-domain.vercel.app/api/kv-demo
```

### Test Postgres Connection
```bash
curl https://your-domain.vercel.app/api/postgres-demo
```

### Test Blob Storage
```bash
curl -X POST -F "file=@example.txt" https://your-domain.vercel.app/api/blob-demo
```

## 🔍 Monitoring Commands

### Check API Status
```bash
curl https://your-domain.vercel.app/api/status
```

### View Analytics
```bash
curl https://your-domain.vercel.app/api/analytics-demo
```

### Check Health
```bash
curl https://your-domain.vercel.app/health
```

## 🛠️ Environment Setup

### Setup Environment Variables
```bash
./scripts/setup-env.sh
```

### Deploy with Environment
```bash
./scripts/deploy.sh
```

### Check Environment
```bash
cat .env.local
```

## 📊 Analytics Commands

### Track Custom Event
```bash
curl -X POST https://your-domain.vercel.app/api/analytics-demo \
  -H "Content-Type: application/json" \
  -d '{"event": "custom_event", "properties": {"page": "/test"}, "userId": "user123"}'
```

### Get Analytics Data
```bash
curl https://your-domain.vercel.app/api/analytics-demo?event=page_view&userId=user123
```

## 🔒 Security Commands

### Test Security Headers
```bash
curl -I https://your-domain.vercel.app/api/security-demo
```

### Check Middleware
```bash
curl -H "User-Agent: TestBot" https://your-domain.vercel.app/
```

## 🌐 Static File Commands

### Add Image
```bash
# Copy image to public directory
cp image.jpg public/static-demo/
```

### Add JSON Data
```bash
echo '{"data": "example"}' > public/static-demo/data.json
```

### Add CSS File
```bash
echo 'body { color: red; }' > public/static-demo/styles.css
```

## 🚀 Advanced Commands

### Deploy with Custom Domain
```bash
vercel --prod --name custom-domain
```

### Set Environment Variables
```bash
vercel env add CUSTOM_KEY
```

### View Logs
```bash
vercel logs
```

### Check Function Logs
```bash
vercel logs --function=api/status
```

## 🔄 Update Commands

### Update Dependencies
```bash
npm update
```

### Update Vercel CLI
```bash
npm install -g vercel@latest
```

### Force Deploy
```bash
vercel --prod --force
```

## 📋 Maintenance Commands

### Clean Build
```bash
rm -rf .next && npm run build
```

### Clear Cache
```bash
vercel --prod --force
```

### Check Function Status
```bash
vercel ls --scope=your-team
```

## 🎯 One-Line Commands for Common Tasks

### Quick Deploy
```bash
npm run build && npm run deploy
```

### Add New Feature
```bash
mkdir -p app/features/new-feature && echo 'export default function NewFeature() { return <div>New Feature</div> }' > app/features/new-feature/page.tsx && npm run deploy
```

### Update API
```bash
echo 'export async function GET() { return Response.json({ updated: true }) }' > app/api/status/route.ts && npm run deploy
```

### Add Static Content
```bash
echo "New content" > public/new-content.txt && npm run deploy
```

## 🆘 Troubleshooting Commands

### Check Build Errors
```bash
npm run build 2>&1 | tee build.log
```

### Check Deployment Errors
```bash
vercel logs --limit=50
```

### Verify Environment
```bash
vercel env ls
```

### Check Function Performance
```bash
vercel logs --function=api/status --limit=10
```

## 📝 Notes for Cursor Agent

- All commands can be run directly in the terminal
- Use `npm run deploy` for production deployments
- Use `npm run deploy-preview` for preview deployments
- Environment variables are automatically loaded from `.env.local`
- The site will automatically redeploy when you push to the connected Git repository
- All API endpoints are available at `/api/endpoint-name`
- Static files are served from the `public/` directory
- The site includes comprehensive error handling and logging
