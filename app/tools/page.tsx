'use client'

import { useState, useEffect } from 'react'
import { 
  Code, 
  Play, 
  Plus, 
  Search, 
  Filter,
  Calculator,
  FileText,
  BarChart3,
  Zap,
  Settings,
  Eye,
  Edit,
  Trash2,
  Download
} from 'lucide-react'
import Link from 'next/link'

interface Tool {
  id: number
  name: string
  description: string
  code: string
  category: string
  parameters: any
  tags: string[]
  created_at: string
  updated_at?: string
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTool, setNewTool] = useState({
    name: '',
    description: '',
    code: '',
    category: 'custom',
    parameters: {},
    tags: []
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'math', label: 'Mathematics' },
    { value: 'text', label: 'Text Processing' },
    { value: 'data', label: 'Data Analysis' },
    { value: 'development', label: 'Development' },
    { value: 'custom', label: 'Custom' }
  ]

  const builtInTools = [
    {
      name: 'Calculator',
      description: 'Advanced mathematical calculations and expressions',
      category: 'math',
      icon: <Calculator className="w-6 h-6" />,
      code: `# Calculator Tool
import math

def calculate(expression):
    try:
        # Safe evaluation of mathematical expressions
        allowed_names = {
            k: v for k, v in math.__dict__.items() if not k.startswith("__")
        }
        allowed_names.update({
            "abs": abs, "round": round, "min": min, "max": max,
            "sum": sum, "pow": pow, "sqrt": math.sqrt
        })
        
        result = eval(expression, {"__builtins__": {}}, allowed_names)
        return f"Result: {result}"
    except Exception as e:
        return f"Error: {str(e)}"

# Example usage
print(calculate("2 + 2 * 3"))
print(calculate("sqrt(16)"))
print(calculate("sin(pi/2)"))`
    },
    {
      name: 'Text Processor',
      description: 'Text analysis, formatting, and manipulation tools',
      category: 'text',
      icon: <FileText className="w-6 h-6" />,
      code: `# Text Processor Tool
import re
from collections import Counter

def process_text(text, operation='analyze'):
    if operation == 'analyze':
        words = re.findall(r'\\b\\w+\\b', text.lower())
        word_count = Counter(words)
        return {
            'total_words': len(words),
            'unique_words': len(word_count),
            'most_common': word_count.most_common(5),
            'characters': len(text),
            'lines': len(text.split('\\n'))
        }
    elif operation == 'clean':
        # Remove extra whitespace and normalize
        cleaned = re.sub(r'\\s+', ' ', text.strip())
        return cleaned
    elif operation == 'extract_emails':
        emails = re.findall(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b', text)
        return emails

# Example usage
sample_text = "Hello world! This is a sample text with multiple words. hello@example.com"
print("Analysis:", process_text(sample_text, 'analyze'))
print("Cleaned:", process_text(sample_text, 'clean'))
print("Emails:", process_text(sample_text, 'extract_emails'))`
    },
    {
      name: 'Data Analyzer',
      description: 'Statistical analysis and data visualization',
      category: 'data',
      icon: <BarChart3 className="w-6 h-6" />,
      code: `# Data Analyzer Tool
import statistics
import json

def analyze_data(data):
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except:
            data = [float(x) for x in data.split(',')]
    
    if not data:
        return "No data provided"
    
    try:
        numeric_data = [float(x) for x in data]
        
        analysis = {
            'count': len(numeric_data),
            'sum': sum(numeric_data),
            'mean': statistics.mean(numeric_data),
            'median': statistics.median(numeric_data),
            'mode': statistics.mode(numeric_data) if len(set(numeric_data)) < len(numeric_data) else 'No mode',
            'min': min(numeric_data),
            'max': max(numeric_data),
            'range': max(numeric_data) - min(numeric_data),
            'std_dev': statistics.stdev(numeric_data) if len(numeric_data) > 1 else 0
        }
        
        return analysis
    except ValueError:
        return "Error: Data must be numeric"

# Example usage
sample_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("Analysis:", analyze_data(sample_data))`
    }
  ]

  useEffect(() => {
    fetchTools()
  }, [])

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/tools')
      const data = await response.json()
      setTools(data.tools || [])
    } catch (error) {
      console.error('Error fetching tools:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTool = async () => {
    try {
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTool)
      })
      
      if (response.ok) {
        setShowCreateForm(false)
        setNewTool({ name: '', description: '', code: '', category: 'custom', parameters: {}, tags: [] })
        fetchTools()
      }
    } catch (error) {
      console.error('Error creating tool:', error)
    }
  }

  const deleteTool = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tool?')) return
    
    try {
      const response = await fetch(`/api/tools?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchTools()
      }
    } catch (error) {
      console.error('Error deleting tool:', error)
    }
  }

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading tools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Python Tools</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create, manage, and execute Python tools with persistent storage and real-time execution.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Tool
          </button>
        </div>

        {/* Built-in Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Built-in Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {builtInTools.map((tool, index) => (
              <div key={index} className="feature-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-blue-600">{tool.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{tool.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                <div className="space-y-2">
                  <Link
                    href={`/tools/run?tool=${encodeURIComponent(tool.name)}&code=${encodeURIComponent(tool.code)}`}
                    className="btn-primary w-full inline-flex items-center justify-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run Tool
                  </Link>
                  <button
                    onClick={() => {
                      setNewTool({
                        name: tool.name,
                        description: tool.description,
                        code: tool.code,
                        category: tool.category,
                        parameters: {},
                        tags: [tool.category]
                      })
                      setShowCreateForm(true)
                    }}
                    className="btn-secondary w-full inline-flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to My Tools
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Tools */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Tools ({filteredTools.length})</h2>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tools found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Create your first Python tool to get started.'
                }
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-primary inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Tool
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="feature-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Code className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{tool.category}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => deleteTool(tool.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete tool"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    {tool.description || 'No description provided'}
                  </p>
                  
                  <div className="space-y-2">
                    <Link
                      href={`/tools/run?tool=${encodeURIComponent(tool.name)}&code=${encodeURIComponent(tool.code)}`}
                      className="btn-primary w-full inline-flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run Tool
                    </Link>
                    <div className="flex space-x-2">
                      <button className="btn-secondary flex-1 inline-flex items-center justify-center text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button className="btn-secondary flex-1 inline-flex items-center justify-center text-sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Created: {new Date(tool.created_at).toLocaleDateString()}
                    </div>
                    {tool.tags && tool.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {tool.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Tool Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Tool</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tool Name
                  </label>
                  <input
                    type="text"
                    value={newTool.name}
                    onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter tool name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTool.description}
                    onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                    placeholder="Describe what this tool does"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newTool.category}
                    onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="math">Mathematics</option>
                    <option value="text">Text Processing</option>
                    <option value="data">Data Analysis</option>
                    <option value="development">Development</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Python Code
                  </label>
                  <textarea
                    value={newTool.code}
                    onChange={(e) => setNewTool({...newTool, code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
                    rows={10}
                    placeholder="# Enter your Python code here&#10;print('Hello World')"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={createTool}
                  className="btn-primary"
                  disabled={!newTool.name || !newTool.code}
                >
                  Create Tool
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}