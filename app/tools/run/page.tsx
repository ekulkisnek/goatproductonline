'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Play, 
  Save, 
  Download, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Code, 
  FileText,
  Copy,
  RefreshCw
} from 'lucide-react'

interface ExecutionResult {
  executionId: string
  result: {
    success: boolean
    stdout: string
    stderr: string
    error?: string
    traceback?: string
  }
  executionTime: string
  resultUrl: string
  timestamp: string
}

function RunToolPageContent() {
  const searchParams = useSearchParams()
  const [toolName, setToolName] = useState('')
  const [code, setCode] = useState('')
  const [parameters, setParameters] = useState('')
  const [executing, setExecuting] = useState(false)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<ExecutionResult[]>([])

  useEffect(() => {
    const tool = searchParams.get('tool')
    const codeParam = searchParams.get('code')
    
    if (tool) setToolName(decodeURIComponent(tool))
    if (codeParam) setCode(decodeURIComponent(codeParam))
    
    fetchHistory()
  }, [searchParams])

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/python-execute')
      const data = await response.json()
      setHistory(data.executions || [])
    } catch (error) {
      console.error('Error fetching history:', error)
    }
  }

  const executeCode = async () => {
    if (!code.trim()) {
      setError('Please enter some Python code to execute')
      return
    }

    setExecuting(true)
    setError('')
    setResult(null)

    try {
      let parsedParameters = {}
      if (parameters.trim()) {
        try {
          parsedParameters = JSON.parse(parameters)
        } catch (e) {
          setError('Invalid JSON in parameters field')
          setExecuting(false)
          return
        }
      }

      const response = await fetch('/api/python-execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          toolName: toolName || 'custom',
          parameters: parsedParameters
        })
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        fetchHistory() // Refresh history
      } else {
        setError(data.error || 'Execution failed')
      }
    } catch (error) {
      setError('Network error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setExecuting(false)
    }
  }

  const saveResult = async () => {
    if (!result) return

    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          executionId: result.executionId,
          resultData: JSON.stringify(result.result, null, 2),
          fileName: `${toolName || 'execution'}_${Date.now()}.json`,
          contentType: 'application/json'
        })
      })

      if (response.ok) {
        alert('Result saved successfully!')
      } else {
        alert('Failed to save result')
      }
    } catch (error) {
      alert('Error saving result: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Run Python Tool</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Execute Python code and view results in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Input */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Code className="w-6 h-6 mr-2 text-blue-600" />
                Code Editor
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tool Name
                  </label>
                  <input
                    type="text"
                    value={toolName}
                    onChange={(e) => setToolName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter tool name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Parameters (JSON)
                  </label>
                  <textarea
                    value={parameters}
                    onChange={(e) => setParameters(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
                    rows={3}
                    placeholder='{"param1": "value1", "param2": 123}'
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Python Code
                  </label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
                    rows={15}
                    placeholder="# Enter your Python code here&#10;print('Hello World')"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={executeCode}
                    disabled={executing || !code.trim()}
                    className="btn-primary flex-1 inline-flex items-center justify-center"
                  >
                    {executing ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Execute Code
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(code)}
                    className="btn-secondary inline-flex items-center"
                    title="Copy code to clipboard"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sample Code Examples */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sample Code</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setCode(`# Simple Calculator
a = 10
b = 5
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")`)}
                  className="w-full text-left p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">Calculator</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Basic arithmetic operations</div>
                </button>
                
                <button
                  onClick={() => setCode(`# Text Analysis
text = "Hello World! This is a sample text for analysis."
words = text.split()
print(f"Total words: {len(words)}")
print(f"Total characters: {len(text)}")
print(f"Most common words: {max(words, key=words.count)}")
print(f"Text in uppercase: {text.upper()}")`)}
                  className="w-full text-left p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">Text Analysis</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Analyze text content</div>
                </button>
                
                <button
                  onClick={() => setCode(`# Data Processing
import json

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
stats = {
    "sum": sum(data),
    "average": sum(data) / len(data),
    "min": min(data),
    "max": max(data),
    "count": len(data)
}
print("Data Statistics:")
print(json.dumps(stats, indent=2))`)}
                  className="w-full text-left p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">Data Statistics</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Calculate basic statistics</div>
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Execution Result */}
            {result && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                    {result.result.success ? (
                      <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 mr-2 text-red-600" />
                    )}
                    Execution Result
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={saveResult}
                      className="btn-secondary inline-flex items-center text-sm"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={() => copyToClipboard(result.result.stdout || result.result.stderr || '')}
                      className="btn-secondary inline-flex items-center text-sm"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {result.executionTime}
                    </div>
                    <div>ID: {result.executionId}</div>
                  </div>

                  {result.result.stdout && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Output</h4>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                        {result.result.stdout}
                      </pre>
                    </div>
                  )}

                  {result.result.stderr && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Error Output</h4>
                      <pre className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-sm overflow-x-auto text-red-800 dark:text-red-200">
                        {result.result.stderr}
                      </pre>
                    </div>
                  )}

                  {result.result.error && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Error</h4>
                      <pre className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-sm overflow-x-auto text-red-800 dark:text-red-200">
                        {result.result.error}
                      </pre>
                    </div>
                  )}

                  {result.result.traceback && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Traceback</h4>
                      <pre className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-sm overflow-x-auto text-red-800 dark:text-red-200">
                        {result.result.traceback}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="card border-red-200 dark:border-red-800">
                <div className="flex items-center mb-2">
                  <XCircle className="w-6 h-6 text-red-600 mr-2" />
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error</h3>
                </div>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Execution History */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Recent Executions
              </h3>
              
              {history.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-center py-4">
                  No executions yet. Run some code to see history here.
                </p>
              ) : (
                <div className="space-y-3">
                  {history.slice(0, 5).map((execution) => (
                    <div key={execution.executionId} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {execution.result.success ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {execution.executionId.split('_')[2] || 'Custom'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {execution.executionTime}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(execution.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RunToolPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading tool execution page...</p>
        </div>
      </div>
    }>
      <RunToolPageContent />
    </Suspense>
  )
}