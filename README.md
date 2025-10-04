# Vercel Free Tier Demo - Complete Feature Showcase

A comprehensive demonstration of all Vercel free tier features, designed for seamless integration with Cursor's background agent.

## 🚀 Quick Start

### Deploy to Vercel (One Command)
```bash
npm run deploy
```

### Local Development
```bash
npm install
npm run dev
```

## 📋 Features Demonstrated

### ✅ Serverless Functions
- **Location**: `app/api/serverless-demo/route.ts`
- **Demo**: `/api/serverless-demo`
- **Features**: Auto-scaling, pay-per-request, zero configuration
- **Free Tier**: 100GB-hours execution time

### ⚡ Edge Functions
- **Location**: `app/api/edge-demo/route.ts`
- **Demo**: `/api/edge-demo`
- **Features**: Ultra-low latency, global distribution
- **Free Tier**: 500,000 invocations

### 🗄️ Vercel KV (Redis)
- **Location**: `app/api/kv-demo/route.ts`
- **Demo**: `/api/kv-demo`
- **Features**: Redis-compatible, serverless scaling
- **Free Tier**: 256MB storage

### 🐘 Vercel Postgres
- **Location**: `app/api/postgres-demo/route.ts`
- **Demo**: `/api/postgres-demo`
- **Features**: Serverless PostgreSQL, connection pooling
- **Free Tier**: 1GB storage, 1B row reads

### ☁️ Vercel Blob Storage
- **Location**: `app/api/blob-demo/route.ts`
- **Demo**: `/api/blob-demo`
- **Features**: Object storage, global CDN
- **Free Tier**: 1GB storage, 1GB bandwidth

### 🌐 Static File Serving
- **Location**: `public/static-demo/`
- **Demo**: `/static-demo`
- **Features**: Global CDN, automatic compression
- **Free Tier**: 100GB bandwidth

### 🔒 Security & Middleware
- **Location**: `middleware.ts`
- **Features**: Security headers, rate limiting, bot detection
- **Free Tier**: All security features included

### 📊 Analytics & Monitoring
- **Location**: `app/analytics-demo/`
- **Demo**: `/analytics-demo`
- **Features**: Real-time analytics, performance monitoring
- **Free Tier**: Unlimited events, 90-day retention

## 🛠️ Cursor Background Agent Integration

This project is specifically designed for Cursor's background agent with:

### One-Command Operations
```bash
# Deploy to production
npm run deploy

# Add new API route
echo 'export async function GET() { return Response.json({ message: "Hello" }) }' > app/api/hello/route.ts

# Add new page
echo 'export default function NewPage() { return <div>New Page</div> }' > app/new-page/page.tsx

# Add static file
echo "Hello World" > public/hello.txt
```

### Automated Deployment
- Automatic deployments on git push
- Preview deployments for every PR
- Zero-downtime deployments
- Automatic rollbacks on failure

### Environment Management
```bash
# Setup environment
./scripts/setup-env.sh

# Deploy with environment
./scripts/deploy.sh
```

## 📁 Project Structure

```
vercelhostingtests/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Serverless Functions)
│   │   ├── serverless-demo/      # Serverless function demo
│   │   ├── edge-demo/           # Edge function demo
│   │   ├── kv-demo/             # KV database demo
│   │   ├── postgres-demo/       # Postgres database demo
│   │   ├── blob-demo/           # Blob storage demo
│   │   ├── security-demo/       # Security features demo
│   │   ├── analytics-demo/      # Analytics API demo
│   │   └── status/              # Health check endpoint
│   ├── analytics-demo/          # Analytics dashboard page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── public/                       # Static files
│   ├── static-demo/             # Static file demo
│   ├── robots.txt               # SEO robots file
│   └── sitemap.xml              # SEO sitemap
├── scripts/                      # Automation scripts
│   ├── deploy.sh                # Deployment script
│   ├── setup-env.sh             # Environment setup
│   └── cursor-agent-commands.md # Cursor agent commands
├── middleware.ts                 # Edge middleware
├── next.config.js               # Next.js configuration
├── vercel.json                  # Vercel configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🔧 Environment Setup

### Required Environment Variables
```bash
# Vercel KV (Redis)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token

# Vercel Postgres
POSTGRES_URL=your_postgres_url

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_blob_token
```

### Setup Commands
```bash
# Copy environment template
cp env.example .env.local

# Edit environment variables
nano .env.local

# Deploy with environment
npm run deploy
```

## 🚀 Deployment Options

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

### Option 2: Git Integration
1. Push to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Automatic deployments on push

### Option 3: Automated Script
```bash
# Run deployment script
./scripts/deploy.sh
```

## 📊 Free Tier Limits

| Feature | Free Tier Limit |
|---------|----------------|
| Serverless Functions | 100GB-hours execution time |
| Edge Functions | 500,000 invocations |
| Bandwidth | 100GB per month |
| Build Minutes | 6,000 per month |
| KV Database | 256MB storage |
| Postgres Database | 1GB storage, 1B row reads |
| Blob Storage | 1GB storage, 1GB bandwidth |
| Custom Domains | Unlimited |
| Team Members | Unlimited |
| Deployments | Unlimited |

## 🔍 API Endpoints

### Health & Status
- `GET /api/status` - System health check
- `GET /api/health` - Redirects to status

### Feature Demos
- `GET /api/serverless-demo` - Serverless function demo
- `GET /api/edge-demo` - Edge function demo
- `GET /api/kv-demo` - KV database demo
- `GET /api/postgres-demo` - Postgres database demo
- `GET /api/blob-demo` - Blob storage demo
- `GET /api/security-demo` - Security features demo
- `GET /api/analytics-demo` - Analytics API demo

### Static Files
- `/static-demo/` - Static file serving demo
- `/robots.txt` - SEO robots file
- `/sitemap.xml` - SEO sitemap

## 🎯 Cursor Agent Commands

### Quick Deploy
```bash
npm run deploy
```

### Add New Feature
```bash
# Create new API endpoint
mkdir -p app/api/new-endpoint
echo 'export async function GET() { return Response.json({ message: "Hello" }) }' > app/api/new-endpoint/route.ts

# Create new page
mkdir -p app/new-page
echo 'export default function NewPage() { return <div>New Page</div> }' > app/new-page/page.tsx

# Add static file
echo "New content" > public/new-file.txt

# Deploy changes
npm run deploy
```

### Database Operations
```bash
# Test KV connection
curl https://your-domain.vercel.app/api/kv-demo

# Test Postgres connection
curl https://your-domain.vercel.app/api/postgres-demo

# Test Blob storage
curl -X POST -F "file=@example.txt" https://your-domain.vercel.app/api/blob-demo
```

### Monitoring
```bash
# Check API status
curl https://your-domain.vercel.app/api/status

# View analytics
curl https://your-domain.vercel.app/api/analytics-demo

# Check logs
vercel logs
```

## 🛠️ Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Testing
```bash
# Test all API endpoints
curl https://localhost:3000/api/status
curl https://localhost:3000/api/serverless-demo
curl https://localhost:3000/api/edge-demo
```

## 📝 Customization

### Adding New Features
1. Create new API route in `app/api/`
2. Create new page in `app/`
3. Add static files to `public/`
4. Update navigation in `app/page.tsx`
5. Deploy with `npm run deploy`

### Environment Variables
1. Copy `env.example` to `.env.local`
2. Add your Vercel storage credentials
3. Deploy with `npm run deploy`

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Inline or CSS modules

## 🆘 Troubleshooting

### Common Issues
1. **Environment variables not working**: Check `.env.local` file
2. **Database connection failed**: Verify credentials in Vercel dashboard
3. **Build errors**: Check `npm run build` output
4. **Deployment failed**: Check `vercel logs`

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

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Free Tier](https://vercel.com/pricing)
- [Cursor AI](https://cursor.sh)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for the Vercel free tier community**
