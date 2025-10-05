'use client'

import { useState, useEffect } from 'react'
import { 
  Server, 
  Database, 
  Zap, 
  Globe, 
  Shield, 
  BarChart3, 
  Code, 
  Cloud,
  ArrowRight,
  CheckCircle,
  Star,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [stats, setStats] = useState({
    requests: 0,
    functions: 0,
    bandwidth: 0
  })

  useEffect(() => {
    let isMounted = true
    // Fetch a one-time snapshot from the status API (no auto-increment)
    fetch('/api/status')
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return
        setStats({
          requests: typeof data?.metrics?.requests === 'number' ? data.metrics.requests : 0,
          functions: 0,
          bandwidth: 0,
        })
      })
      .catch(() => {
        if (!isMounted) return
        setStats({ requests: 0, functions: 0, bandwidth: 0 })
      })
    return () => {
      isMounted = false
    }
  }, [])

  const features = [
    {
      icon: <Server className="w-8 h-8 text-blue-600" />,
      title: "Serverless Functions",
      description: "Deploy API routes with zero configuration. Auto-scaling and pay-per-request.",
      demo: "/api/serverless-demo",
      code: "app/api/serverless-demo/route.ts"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Edge Functions",
      description: "Run code at the edge for ultra-low latency. Global distribution included.",
      demo: "/api/edge-demo",
      code: "app/api/edge-demo/route.ts"
    },
    {
      icon: <Database className="w-8 h-8 text-green-600" />,
      title: "Vercel KV (Redis)",
      description: "Managed Redis database for caching and real-time data. 256MB free tier.",
      demo: "/api/kv-demo",
      code: "app/api/kv-demo/route.ts"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-600" />,
      title: "Vercel Postgres",
      description: "Serverless PostgreSQL database. 1GB storage, 1 billion row reads free.",
      demo: "/api/postgres-demo",
      code: "app/api/postgres-demo/route.ts"
    },
    {
      icon: <Cloud className="w-8 h-8 text-cyan-600" />,
      title: "Vercel Blob Storage",
      description: "Object storage for files and media. 1GB storage, 1GB bandwidth free.",
      demo: "/api/blob-demo",
      code: "app/api/blob-demo/route.ts"
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "Global CDN",
      description: "Automatic global content delivery. 100GB bandwidth free per month.",
      demo: "/static-demo",
      code: "public/static-demo/"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Security & SSL",
      description: "Automatic HTTPS, DDoS protection, and security headers included.",
      demo: "/api/security-demo",
      code: "app/api/security-demo/route.ts"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Analytics & Monitoring",
      description: "Built-in analytics, speed insights, and performance monitoring.",
      demo: "/analytics-demo",
      code: "app/analytics-demo/page.tsx"
    },
    {
      icon: <Database className="w-8 h-8 text-emerald-600" />,
      title: "Semiconductor Fabrication",
      description: "SPC + wafer map demo, fab KPIs, and engineering workflows.",
      demo: "/fabrication",
      code: "app/fabrication/page.tsx"
    }
  ]

  const freeTierLimits = [
    { feature: "Serverless Functions", limit: "100GB-hours execution time" },
    { feature: "Edge Functions", limit: "500,000 invocations" },
    { feature: "Bandwidth", limit: "100GB per month" },
    { feature: "Build Minutes", limit: "6,000 per month" },
    { feature: "KV Database", limit: "256MB storage" },
    { feature: "Postgres Database", limit: "1GB storage, 1B row reads" },
    { feature: "Blob Storage", limit: "1GB storage, 1GB bandwidth" },
    { feature: "Custom Domains", limit: "Unlimited" },
    { feature: "Team Members", limit: "Unlimited" },
    { feature: "Deployments", limit: "Unlimited" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">▲</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Vercel Free Tier Demo</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</Link>
              <Link href="#limits" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Free Tier Limits</Link>
              <Link href="#cursor-agent" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Cursor Agent</Link>
              <Link href="/fabrication" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Fabrication</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Complete <span className="text-blue-600">Vercel Free Tier</span> Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Comprehensive showcase of all Vercel free tier features. Perfect for learning, 
            prototyping, and small projects. Fully automated with Cursor background agent support.
          </p>
          
          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card">
              <div className="flex items-center justify-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.requests.toLocaleString()}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">API Requests</p>
            </div>
            <div className="card">
              <div className="flex items-center justify-center space-x-2">
                <Server className="w-6 h-6 text-green-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.functions}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Functions Deployed</p>
            </div>
            <div className="card">
              <div className="flex items-center justify-center space-x-2">
                <Globe className="w-6 h-6 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.bandwidth}MB</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Bandwidth Used</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#features" className="btn-primary inline-flex items-center">
              Explore Features <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="https://vercel.com/docs" target="_blank" className="btn-secondary inline-flex items-center">
              Vercel Docs <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Feature Showcase
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every Vercel free tier feature demonstrated with live examples, 
              code samples, and interactive demos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="flex items-center space-x-3 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <div className="space-y-3">
                  <Link 
                    href={feature.demo} 
                    className="btn-primary w-full inline-flex items-center justify-center"
                  >
                    Try Demo <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <Code className="w-4 h-4 inline mr-1" />
                    {feature.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tier Limits */}
      <section id="limits" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Free Tier Limits & Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Generous free tier limits that cover most small to medium projects. 
              No credit card required to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTierLimits.map((item, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.feature}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.limit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="card max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Completely Free Forever
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                No credit card required. No time limits. No hidden fees. 
                Perfect for learning, prototyping, and small projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cursor Agent Section */}
      <section id="cursor-agent" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cursor Background Agent Ready
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              This site is designed for seamless integration with Cursor's background agent. 
              Make changes, deploy updates, and manage everything through simple commands.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  🚀 Automated Deployment
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Automatic deployments on git push</li>
                  <li>• Preview deployments for every PR</li>
                  <li>• Zero-downtime deployments</li>
                  <li>• Automatic rollbacks on failure</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  🛠️ Easy Development
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Hot reloading in development</li>
                  <li>• TypeScript support out of the box</li>
                  <li>• ESLint and Prettier configured</li>
                  <li>• Environment variables management</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  📝 Cursor Agent Commands
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-600"># Deploy to production</div>
                  <div className="text-blue-600">npm run deploy</div>
                  <br />
                  <div className="text-green-600"># Create preview deployment</div>
                  <div className="text-blue-600">npm run deploy-preview</div>
                  <br />
                  <div className="text-green-600"># Add new API route</div>
                  <div className="text-blue-600"># Just create app/api/new-route/route.ts</div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  🔧 Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link href="/api/status" className="btn-primary w-full inline-flex items-center justify-center">
                    Check API Status
                  </Link>
                  <Link href="/api/health" className="btn-secondary w-full inline-flex items-center justify-center">
                    Health Check
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">▲</span>
                </div>
                <span className="text-xl font-bold">Vercel Free Tier Demo</span>
              </div>
              <p className="text-gray-400">
                Complete showcase of Vercel's free tier capabilities with Cursor agent integration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#limits" className="hover:text-white transition-colors">Free Tier Limits</Link></li>
                <li><Link href="#cursor-agent" className="hover:text-white transition-colors">Cursor Agent</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://vercel.com/docs" target="_blank" className="hover:text-white transition-colors">Vercel Documentation</a></li>
                <li><a href="https://nextjs.org/docs" target="_blank" className="hover:text-white transition-colors">Next.js Documentation</a></li>
                <li><a href="https://cursor.sh" target="_blank" className="hover:text-white transition-colors">Cursor AI</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Vercel Free Tier Demo. Built with Next.js and deployed on Vercel.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
