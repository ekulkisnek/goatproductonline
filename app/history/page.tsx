'use client'

import { useState, useEffect } from 'react'
import { 
  History, 
  Play, 
  Download, 
  Trash2, 
  Search, 
  Filter,
  CheckCircle, 
  XCircle, 
  Clock,
  Code,
  Calendar,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface Execution {
  id: string
  tool_name: string
  status: string
  execution_time: number
  created_at: string
  completed_at?: string
  stdout?: string
  stderr?: string
  error?: string
  result_url?: string
}

export default function HistoryPage() {
  const [executions, setExecutions] = useState<Execution[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(null)

  useEffect(() => {
    fetchExecutions()
  }, [])

  const fetchExecutions = async () => {
    try {
      const response = await fetch('/api/python-execute')
      const data = await response.json()
      setExecutions(data.executions || [])
    } catch (error) {
      console.error('Error fetching executions:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteExecution = async (id: string) => {
    if (!confirm('Are you sure you want to delete this execution?')) return
    
    try {
      const response = await fetch(`/api/results?executionId=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchExecutions()
        if (selectedExecution?.id === id) {
          setSelectedExecution(null)
        }
      }
    } catch (error) {
      console.error('Error deleting execution:', error)
    }
  }

  const filteredExecutions = executions.filter(execution => {
    const matchesSearch = execution.tool_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || execution.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'running':
        return <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'running':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading execution history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Execution History</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            View and manage your Python tool execution history, results, and performance metrics.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search executions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="running">Running</option>
            </select>
          </div>
          <Link href="/tools" className="btn-primary inline-flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Back to Tools
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{executions.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Total Executions</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              {executions.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Successful</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-red-600">
              {executions.filter(e => e.status === 'failed').length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Failed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">
              {executions.length > 0 ? Math.round(executions.reduce((sum, e) => sum + (e.execution_time || 0), 0) / executions.length) : 0}ms
            </div>
            <div className="text-gray-600 dark:text-gray-300">Avg Execution Time</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Execution List */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <History className="w-6 h-6 mr-2 text-blue-600" />
                Executions ({filteredExecutions.length})
              </h2>
              
              {filteredExecutions.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No executions found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Run some Python tools to see execution history here.'
                    }
                  </p>
                  <Link href="/tools" className="btn-primary inline-flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Run Python Tools
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredExecutions.map((execution) => (
                    <div 
                      key={execution.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedExecution?.id === execution.id 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedExecution(execution)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(execution.status)}
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {execution.tool_name || 'Custom Tool'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              ID: {execution.id.substring(0, 20)}...
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                            {execution.status}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteExecution(execution.id)
                            }}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete execution"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {execution.execution_time ? `${execution.execution_time}ms` : 'N/A'}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(execution.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(execution.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Execution Details */}
          <div className="lg:col-span-1">
            {selectedExecution ? (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  Execution Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tool Name
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedExecution.tool_name || 'Custom Tool'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Execution ID
                    </label>
                    <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                      {selectedExecution.id}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedExecution.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedExecution.status)}`}>
                        {selectedExecution.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Execution Time
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {selectedExecution.execution_time ? `${selectedExecution.execution_time}ms` : 'N/A'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Created At
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(selectedExecution.created_at).toLocaleString()}
                    </p>
                  </div>
                  
                  {selectedExecution.completed_at && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Completed At
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedExecution.completed_at).toLocaleString()}
                      </p>
                    </div>
                  )}
                  
                  {selectedExecution.stdout && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Output
                      </label>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto max-h-32">
                        {selectedExecution.stdout}
                      </pre>
                    </div>
                  )}
                  
                  {selectedExecution.stderr && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Error Output
                      </label>
                      <pre className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm overflow-x-auto max-h-32 text-red-800 dark:text-red-200">
                        {selectedExecution.stderr}
                      </pre>
                    </div>
                  )}
                  
                  {selectedExecution.error && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Error
                      </label>
                      <p className="text-red-800 dark:text-red-200 text-sm">
                        {selectedExecution.error}
                      </p>
                    </div>
                  )}
                  
                  {selectedExecution.result_url && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Result URL
                      </label>
                      <a 
                        href={selectedExecution.result_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm break-all"
                      >
                        {selectedExecution.result_url}
                      </a>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <Link
                        href={`/tools/run?tool=${encodeURIComponent(selectedExecution.tool_name || 'custom')}`}
                        className="btn-primary flex-1 inline-flex items-center justify-center text-sm"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Re-run
                      </Link>
                      {selectedExecution.result_url && (
                        <a
                          href={selectedExecution.result_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary inline-flex items-center justify-center text-sm"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select an Execution</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Click on an execution from the list to view detailed information here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}