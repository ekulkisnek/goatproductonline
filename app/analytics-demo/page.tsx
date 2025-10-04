'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Users, Eye, MousePointer, TrendingUp, Clock } from 'lucide-react'

export default function AnalyticsDemo() {
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    topPages: [],
    realTimeUsers: 0
  })

  useEffect(() => {
    // Simulate real-time analytics updates
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 2),
        bounceRate: Math.random() * 0.4 + 0.3, // 30-70%
        avgSessionDuration: Math.random() * 300 + 60, // 1-6 minutes
        topPages: [
          { page: '/', views: Math.floor(Math.random() * 1000) },
          { page: '/features', views: Math.floor(Math.random() * 500) },
          { page: '/api/status', views: Math.floor(Math.random() * 200) }
        ],
        realTimeUsers: Math.floor(Math.random() * 50) + 10
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const metrics = [
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "Page Views",
      value: analytics.pageViews.toLocaleString(),
      change: "+12.5%",
      color: "text-blue-600"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Unique Visitors",
      value: analytics.uniqueVisitors.toLocaleString(),
      change: "+8.2%",
      color: "text-green-600"
    },
    {
      icon: <MousePointer className="w-6 h-6 text-purple-600" />,
      title: "Bounce Rate",
      value: `${(analytics.bounceRate * 100).toFixed(1)}%`,
      change: "-2.1%",
      color: "text-purple-600"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Avg. Session",
      value: `${Math.floor(analytics.avgSessionDuration / 60)}m ${analytics.avgSessionDuration % 60}s`,
      change: "+5.3%",
      color: "text-orange-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📊 Analytics & Monitoring Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time analytics, performance monitoring, and user behavior tracking 
            powered by Vercel's built-in analytics and monitoring tools.
          </p>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                {metric.icon}
                <span className={`text-sm font-medium ${metric.color}`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {metric.title}
              </p>
            </div>
          ))}
        </div>

        {/* Live Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Real-time Users */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Real-time Users
              </h2>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {analytics.realTimeUsers}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Currently active on the site
              </p>
            </div>
          </div>

          {/* Top Pages */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Top Pages
              </h2>
            </div>
            <div className="space-y-4">
              {analytics.topPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    {page.page}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📈 Built-in Analytics
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Real-time visitor tracking</li>
              <li>• Page view analytics</li>
              <li>• Traffic sources</li>
              <li>• Geographic data</li>
              <li>• Device and browser stats</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ⚡ Speed Insights
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Core Web Vitals monitoring</li>
              <li>• Performance scores</li>
              <li>• Loading time analysis</li>
              <li>• User experience metrics</li>
              <li>• Optimization suggestions</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🔍 Custom Events
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Track user interactions</li>
              <li>• Conversion funnels</li>
              <li>• A/B testing data</li>
              <li>• Custom metrics</li>
              <li>• Goal tracking</li>
            </ul>
          </div>
        </div>

        {/* API Demo */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔧 Analytics API Demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Track Custom Event
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-600"># POST /api/analytics-demo</div>
                <div className="text-blue-600">{'{'}</div>
                <div className="text-blue-600">  "event": "button_click",</div>
                <div className="text-blue-600">  "properties": {'{'}</div>
                <div className="text-blue-600">    "button_id": "cta-button",</div>
                <div className="text-blue-600">    "page": "/features"</div>
                <div className="text-blue-600">  {'}'},</div>
                <div className="text-blue-600">  "userId": "user123"</div>
                <div className="text-blue-600">{'}'}</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Get Analytics Data
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-600"># GET /api/analytics-demo</div>
                <div className="text-green-600"># GET /api/analytics-demo?event=page_view</div>
                <div className="text-green-600"># GET /api/analytics-demo?userId=user123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Free Tier Info */}
        <div className="card bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🆓 Free Tier Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">Unlimited</div>
                <div className="text-gray-600 dark:text-gray-300">Custom Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">90 Days</div>
                <div className="text-gray-600 dark:text-gray-300">Data Retention</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">All Features</div>
                <div className="text-gray-600 dark:text-gray-300">Included</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
