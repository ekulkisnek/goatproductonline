'use client'

import { useState, useEffect } from 'react'
import { 
  Code, 
  Play, 
  Save, 
  History, 
  Settings, 
  FileText,
  Calculator,
  BarChart3,
  Zap,
  Database,
  Cloud,
  ArrowRight,
  CheckCircle,
  Star,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [stats, setStats] = useState({
    toolsRun: 0,
    resultsSaved: 0,
    activeTools: 0
  })

  useEffect(() => {
    // Simulate real-time stats
    const interval = setInterval(() => {
      setStats(prev => ({
        toolsRun: prev.toolsRun + Math.floor(Math.random() * 5),
        resultsSaved: prev.resultsSaved + Math.floor(Math.random() * 3),
        activeTools: prev.activeTools + Math.floor(Math.random() * 2)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Python Tool Execution",
      description: "Run Python scripts directly in the browser with real-time output and error handling.",
      demo: "/api/python-execute",
      code: "app/api/python-execute/route.ts"
    },
    {
      icon: <Database className="w-8 h-8 text-green-600" />,
      title: "Tool Management",
      description: "Store, organize, and manage your Python tools with metadata and versioning.",
      demo: "/api/tools",
      code: "app/api/tools/route.ts"
    },
    {
      icon: <Save className="w-8 h-8 text-purple-600" />,
      title: "Results Storage",
      description: "Save execution results, outputs, and generated files with persistent storage.",
      demo: "/api/results",
      code: "app/api/results/route.ts"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Analytics Dashboard",
      description: "Track tool usage, performance metrics, and execution history.",
      demo: "/analytics",
      code: "app/analytics/page.tsx"
    },
    {
      icon: <FileText className="w-8 h-8 text-cyan-600" />,
      title: "Built-in Tools",
      description: "Pre-built Python tools for common tasks: calculator, text processor, data analyzer.",
      demo: "/tools",
      code: "app/tools/page.tsx"
    },
    {
      icon: <History className="w-8 h-8 text-indigo-600" />,
      title: "Execution History",
      description: "View past executions, compare results, and manage execution logs.",
      demo: "/history",
      code: "app/history/page.tsx"
    }
  ]

  const sampleTools = [
    {
      name: "Calculator",
      description: "Advanced mathematical calculations and expressions",
      category: "Math",
      icon: <Calculator className="w-6 h-6" />
    },
    {
      name: "Text Processor",
      description: "Text analysis, formatting, and manipulation tools",
      category: "Text",
      icon: <FileText className="w-6 h-6" />
    },
    {
      name: "Data Analyzer",
      description: "Statistical analysis and data visualization",
      category: "Data",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      name: "Code Generator",
      description: "Generate code snippets and templates",
      category: "Development",
      icon: <Code className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Python Tools Platform</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</Link>
              <Link href="/tools" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Tools</Link>
              <Link href="/history" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">History</Link>
              <Link href="/analytics" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Analytics</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Run <span className="text-blue-600">Python Tools</span> in the Cloud
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Execute Python scripts, save results, and manage your tools with a powerful web interface. 
            Built on Vercel's serverless platform with persistent storage and real-time execution.
          </p>
          
          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card">
              <div className="flex items-center justify-center space-x-2">
                <Play className="w-6 h-6 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.toolsRun.toLocaleString()}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Tools Executed</p>
            </div>
            <div className="card">
              <div className="flex items-center justify-center space-x-2">
                <Save className="w-6 h-6 text-green-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.resultsSaved}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Results Saved</p>
            </div>
            <div className="card">
              <div className="flex items-center justify-center space-x-2">
                <Code className="w-6 h-6 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeTools}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Active Tools</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools" className="btn-primary inline-flex items-center">
              Explore Tools <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/api/python-execute" target="_blank" className="btn-secondary inline-flex items-center">
              Try API <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Tools Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built-in Python Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready-to-use Python tools for common tasks. Each tool can be customized and extended.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sampleTools.map((tool, index) => (
              <div key={index} className="feature-card group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-blue-600">{tool.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {tool.description}
                </p>
                <Link 
                  href={`/tools/${tool.name.toLowerCase().replace(' ', '-')}`} 
                  className="btn-primary w-full inline-flex items-center justify-center"
                >
                  Use Tool <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to run, manage, and store Python tools in the cloud.
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

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by Vercel
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built on Vercel's serverless platform for unlimited scalability and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Serverless Functions</h3>
              <p className="text-gray-600 dark:text-gray-300">Auto-scaling Python execution</p>
            </div>
            <div className="card text-center">
              <Database className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Postgres Database</h3>
              <p className="text-gray-600 dark:text-gray-300">Persistent tool and result storage</p>
            </div>
            <div className="card text-center">
              <Cloud className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Blob Storage</h3>
              <p className="text-gray-600 dark:text-gray-300">File and output storage</p>
            </div>
            <div className="card text-center">
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">Usage tracking and insights</p>
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Python Tools Platform</span>
              </div>
              <p className="text-gray-400">
                Run Python tools in the cloud with persistent storage and real-time execution.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tools" className="hover:text-white transition-colors">Tools</Link></li>
                <li><Link href="/history" className="hover:text-white transition-colors">History</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
                <li><Link href="/api/status" className="hover:text-white transition-colors">API Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://vercel.com/docs" target="_blank" className="hover:text-white transition-colors">Vercel Documentation</a></li>
                <li><a href="https://nextjs.org/docs" target="_blank" className="hover:text-white transition-colors">Next.js Documentation</a></li>
                <li><a href="https://python.org" target="_blank" className="hover:text-white transition-colors">Python Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Python Tools Platform. Built with Next.js and deployed on Vercel.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}