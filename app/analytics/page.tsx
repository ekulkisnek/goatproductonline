'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Code,
  Calendar,
  Activity,
  Zap,
  Database,
  FileText
} from 'lucide-react'

interface AnalyticsData {
  totalExecutions: number
  successfulExecutions: number
  failedExecutions: number
  averageExecutionTime: number
  totalExecutionTime: number
  mostUsedTools: Array<{ tool_name: string; count: number }>
  executionsByDay: Array<{ date: string; count: number }>
  executionsByHour: Array<{ hour: number; count: number }>
  recentActivity: Array<{
    id: string
    tool_name: string
    status: string
    execution_time: number
    created_at: string
  }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      // Simulate analytics data since we don't have a dedicated analytics endpoint yet
      const response = await fetch('/api/python-execute')
      const data = await response.json()
      
      const executions = data.executions || []
      
      // Calculate analytics
      const totalExecutions = executions.length
      const successfulExecutions = executions.filter((e: any) => e.status === 'completed').length
      const failedExecutions = executions.filter((e: any) => e.status === 'failed').length
      const averageExecutionTime = executions.length > 0 
        ? Math.round(executions.reduce((sum: number, e: any) => sum + (e.execution_time || 0), 0) / executions.length)
        : 0
      const totalExecutionTime = executions.reduce((sum: number, e: any) => sum + (e.execution_time || 0), 0)
      
      // Most used tools
      const toolCounts: { [key: string]: number } = {}
      executions.forEach((e: any) => {
        const toolName = e.tool_name || 'custom'
        toolCounts[toolName] = (toolCounts[toolName] || 0) + 1
      })
      const mostUsedTools = Object.entries(toolCounts)
        .map(([tool_name, count]) => ({ tool_name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
      
      // Executions by day (last 7 days)
      const executionsByDay: { [key: string]: number } = {}
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
      })
      
      last7Days.forEach(date => {
        executionsByDay[date] = 0
      })
      
      executions.forEach((e: any) => {
        const date = new Date(e.created_at).toISOString().split('T')[0]
        if (executionsByDay[date] !== undefined) {
          executionsByDay[date]++
        }
      })
      
      const executionsByDayArray = Object.entries(executionsByDay)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date))
      
      // Executions by hour
      const executionsByHour: { [key: number]: number } = {}
      for (let i = 0; i < 24; i++) {
        executionsByHour[i] = 0
      }
      
      executions.forEach((e: any) => {
        const hour = new Date(e.created_at).getHours()
        executionsByHour[hour]++
      })
      
      const executionsByHourArray = Object.entries(executionsByHour)
        .map(([hour, count]) => ({ hour: parseInt(hour), count }))
        .sort((a, b) => a.hour - b.hour)
      
      setAnalytics({
        totalExecutions,
        successfulExecutions,
        failedExecutions,
        averageExecutionTime,
        totalExecutionTime,
        mostUsedTools,
        executionsByDay: executionsByDayArray,
        executionsByHour: executionsByHourArray,
        recentActivity: executions.slice(0, 10)
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSuccessRate = () => {
    if (!analytics || analytics.totalExecutions === 0) return 0
    return Math.round((analytics.successfulExecutions / analytics.totalExecutions) * 100)
  }

  const getFailureRate = () => {
    if (!analytics || analytics.totalExecutions === 0) return 0
    return Math.round((analytics.failedExecutions / analytics.totalExecutions) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Analytics Dashboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track your Python tool usage, performance metrics, and execution patterns.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {['1d', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {range === '1d' ? 'Last 24 Hours' : range === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {analytics?.totalExecutions || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Executions</div>
          </div>
          
          <div className="card text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">
              {getSuccessRate()}%
            </div>
            <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
          </div>
          
          <div className="card text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {analytics?.averageExecutionTime || 0}ms
            </div>
            <div className="text-gray-600 dark:text-gray-300">Avg Execution Time</div>
          </div>
          
          <div className="card text-center">
            <div className="flex items-center justify-center mb-2">
              <Code className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600">
              {analytics?.mostUsedTools.length || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Unique Tools</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Success/Failure Breakdown */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Execution Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900 dark:text-white">Successful</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    {analytics?.successfulExecutions || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {getSuccessRate()}%
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getSuccessRate()}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-gray-900 dark:text-white">Failed</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-red-600">
                    {analytics?.failedExecutions || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {getFailureRate()}%
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getFailureRate()}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Most Used Tools */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Most Used Tools
            </h3>
            
            {analytics?.mostUsedTools.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300 text-center py-4">
                No tools used yet
              </p>
            ) : (
              <div className="space-y-3">
                {analytics?.mostUsedTools.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {tool.tool_name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tool.count}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        executions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Executions by Day */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Executions by Day
            </h3>
            
            <div className="space-y-3">
              {analytics?.executionsByDay.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.max(10, (day.count / Math.max(...(analytics?.executionsByDay.map(d => d.count) || [1]))) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                      {day.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Executions by Hour */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Executions by Hour
            </h3>
            
            <div className="space-y-2">
              {analytics?.executionsByHour.map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-300 w-12">
                    {hour.hour.toString().padStart(2, '0')}:00
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.max(5, (hour.count / Math.max(...(analytics?.executionsByHour.map(h => h.count) || [1]))) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                      {hour.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Recent Activity
          </h3>
          
          {analytics?.recentActivity.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-center py-8">
              No recent activity
            </p>
          ) : (
            <div className="space-y-3">
              {analytics?.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {activity.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {activity.tool_name || 'Custom Tool'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(activity.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.execution_time || 0}ms
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {activity.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}