# Python Tools Platform - Run Python Code in the Cloud

A powerful web platform for executing Python scripts, managing tools, and storing results. Built on Vercel's serverless platform with persistent storage and real-time execution capabilities.

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

### Initialize Database
```bash
curl -X POST https://your-domain.vercel.app/api/init-db
```

## 📋 Platform Features

### ✅ Python Code Execution
- **Location**: `app/api/python-execute/route.ts`
- **Demo**: `/api/python-execute`
- **Features**: Real-time Python execution, error handling, timeout protection
- **Free Tier**: 100GB-hours execution time

### 🛠️ Tool Management
- **Location**: `app/api/tools/route.ts`
- **Demo**: `/api/tools`
- **Features**: Create, read, update, delete Python tools with metadata
- **Free Tier**: 1GB Postgres storage

### 💾 Results Storage
- **Location**: `app/api/results/route.ts`
- **Demo**: `/api/results`
- **Features**: Save execution results, outputs, and generated files
- **Free Tier**: 1GB Blob storage

### 📊 Analytics Dashboard
- **Location**: `app/analytics/page.tsx`
- **Demo**: `/analytics`
- **Features**: Usage tracking, performance metrics, execution history
- **Free Tier**: Unlimited analytics events

### 🔄 Execution History
- **Location**: `app/history/page.tsx`
- **Demo**: `/history`
- **Features**: View past executions, compare results, manage logs
- **Free Tier**: Persistent storage

### 🌐 Web Interface
- **Location**: `app/tools/page.tsx`
- **Demo**: `/tools`
- **Features**: Interactive tool management, code editor, real-time execution
- **Free Tier**: Global CDN distribution

## 🛠️ Built-in Python Tools

### Calculator Tool
- Advanced mathematical calculations
- Safe expression evaluation
- Math library integration
- Error handling

### Text Processor Tool
- Text analysis and statistics
- Email extraction
- Text cleaning and formatting
- Word frequency analysis

### Data Analyzer Tool
- Statistical analysis
- Data visualization preparation
- JSON data processing
- Comprehensive statistics

## 📁 Project Structure

```
python-tools-platform/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Serverless Functions)
│   │   ├── python-execute/        # Python code execution
│   │   ├── tools/                 # Tool management
│   │   ├── results/               # Results storage
│   │   ├── init-db/              # Database initialization
│   │   └── status/               # Health check endpoint
│   ├── tools/                     # Tool management pages
│   │   ├── page.tsx              # Tools listing
│   │   └── run/page.tsx          # Tool execution interface
│   ├── history/                   # Execution history
│   │   └── page.tsx              # History dashboard
│   ├── analytics/                 # Analytics dashboard
│   │   └── page.tsx              # Analytics interface
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                  # Home page
├── public/                        # Static files
├── scripts/                       # Automation scripts
│   ├── deploy.sh                 # Deployment script
│   └── setup-env.sh              # Environment setup
├── middleware.ts                  # Edge middleware
├── next.config.js                # Next.js configuration
├── vercel.json                   # Vercel configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🔧 Environment Setup

### Required Environment Variables
```bash
# Vercel Postgres
POSTGRES_URL=your_postgres_url

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_blob_token

# Vercel KV (Optional - for caching)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```

### Setup Commands
```bash
# Copy environment template
cp env.example .env.local

# Edit environment variables
nano .env.local

# Initialize database
curl -X POST https://your-domain.vercel.app/api/init-db

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
| Postgres Database | 1GB storage, 1B row reads |
| Blob Storage | 1GB storage, 1GB bandwidth |
| Custom Domains | Unlimited |
| Team Members | Unlimited |
| Deployments | Unlimited |

## 🔍 API Endpoints

### Python Execution
- `POST /api/python-execute` - Execute Python code
- `GET /api/python-execute` - Get execution history
- `GET /api/python-execute?id=exec_id` - Get specific execution

### Tool Management
- `GET /api/tools` - List all tools
- `POST /api/tools` - Create new tool
- `PUT /api/tools` - Update tool
- `DELETE /api/tools?id=tool_id` - Delete tool

### Results Management
- `GET /api/results` - List results
- `POST /api/results` - Save result
- `DELETE /api/results?executionId=exec_id` - Delete result

### Database Management
- `POST /api/init-db` - Initialize database
- `GET /api/init-db` - Check database status

### Health & Status
- `GET /api/status` - System health check

## 🎯 Usage Examples

### Execute Python Code
```bash
curl -X POST https://your-domain.vercel.app/api/python-execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello World\")",
    "toolName": "hello_world"
  }'
```

### Create a Tool
```bash
curl -X POST https://your-domain.vercel.app/api/tools \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Calculator",
    "description": "A simple calculator",
    "code": "print(2 + 2)",
    "category": "math",
    "tags": ["calculator", "math"]
  }'
```

### Get Execution History
```bash
curl https://your-domain.vercel.app/api/python-execute
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
# Test Python execution
curl -X POST http://localhost:3000/api/python-execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print(\"Hello World\")"}'

# Test tool management
curl http://localhost:3000/api/tools

# Test database initialization
curl -X POST http://localhost:3000/api/init-db
```

## 📝 Customization

### Adding New Tools
1. Create tool via API or web interface
2. Define Python code and metadata
3. Test execution
4. Share with others

### Custom Python Libraries
The platform supports standard Python libraries. For custom packages:
1. Add to requirements.txt
2. Deploy with updated dependencies
3. Use in your tools

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Inline or CSS modules

## 🆘 Troubleshooting

### Common Issues
1. **Python execution fails**: Check code syntax and imports
2. **Database connection failed**: Verify POSTGRES_URL
3. **Blob storage failed**: Verify BLOB_READ_WRITE_TOKEN
4. **Build errors**: Check `npm run build` output

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

# Test database
curl https://your-domain.vercel.app/api/init-db
```

## 🔒 Security Features

- **Code Sandboxing**: Safe Python execution environment
- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Built-in protection against abuse
- **Error Handling**: Comprehensive error management
- **HTTPS**: Automatic SSL/TLS encryption

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Python Documentation](https://python.org)
- [Vercel Free Tier](https://vercel.com/pricing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for the Python community - Run your code in the cloud!**