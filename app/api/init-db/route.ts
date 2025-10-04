import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Create tools table
    await sql`
      CREATE TABLE IF NOT EXISTS tools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        code TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'custom',
        parameters JSONB DEFAULT '{}',
        tags JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create executions table
    await sql`
      CREATE TABLE IF NOT EXISTS executions (
        id VARCHAR(255) PRIMARY KEY,
        tool_name VARCHAR(255),
        code TEXT NOT NULL,
        parameters JSONB DEFAULT '{}',
        status VARCHAR(50) DEFAULT 'running',
        execution_time INTEGER,
        stdout TEXT,
        stderr TEXT,
        error TEXT,
        result_url TEXT,
        result_file_url TEXT,
        result_file_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP
      )
    `

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_executions_tool_name ON executions(tool_name)
    `
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_executions_status ON executions(status)
    `
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_executions_created_at ON executions(created_at)
    `
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category)
    `

    // Insert some sample tools
    await sql`
      INSERT INTO tools (name, description, code, category, tags) VALUES 
      ('Calculator', 'Advanced mathematical calculations and expressions', 
       'import math

def calculate(expression):
    try:
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

print(calculate("2 + 2 * 3"))
print(calculate("sqrt(16)"))
print(calculate("sin(pi/2)"))', 
       'math', '["calculator", "math"]')
      ON CONFLICT (name) DO NOTHING
    `

    await sql`
      INSERT INTO tools (name, description, code, category, tags) VALUES 
      ('Text Processor', 'Text analysis, formatting, and manipulation tools', 
       'import re
from collections import Counter

def process_text(text, operation="analyze"):
    if operation == "analyze":
        words = re.findall(r"\\b\\w+\\b", text.lower())
        word_count = Counter(words)
        return {
            "total_words": len(words),
            "unique_words": len(word_count),
            "most_common": word_count.most_common(5),
            "characters": len(text),
            "lines": len(text.split("\\n"))
        }
    elif operation == "clean":
        cleaned = re.sub(r"\\s+", " ", text.strip())
        return cleaned
    elif operation == "extract_emails":
        emails = re.findall(r"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b", text)
        return emails

sample_text = "Hello world! This is a sample text with multiple words. hello@example.com"
print("Analysis:", process_text(sample_text, "analyze"))
print("Cleaned:", process_text(sample_text, "clean"))
print("Emails:", process_text(sample_text, "extract_emails"))', 
       'text', '["text", "analysis"]')
      ON CONFLICT (name) DO NOTHING
    `

    await sql`
      INSERT INTO tools (name, description, code, category, tags) VALUES 
      ('Data Analyzer', 'Statistical analysis and data visualization', 
       'import statistics
import json

def analyze_data(data):
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except:
            data = [float(x) for x in data.split(",")]
    
    if not data:
        return "No data provided"
    
    try:
        numeric_data = [float(x) for x in data]
        
        analysis = {
            "count": len(numeric_data),
            "sum": sum(numeric_data),
            "mean": statistics.mean(numeric_data),
            "median": statistics.median(numeric_data),
            "mode": statistics.mode(numeric_data) if len(set(numeric_data)) < len(numeric_data) else "No mode",
            "min": min(numeric_data),
            "max": max(numeric_data),
            "range": max(numeric_data) - min(numeric_data),
            "std_dev": statistics.stdev(numeric_data) if len(numeric_data) > 1 else 0
        }
        
        return analysis
    except ValueError:
        return "Error: Data must be numeric"

sample_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("Analysis:", analyze_data(sample_data))', 
       'data', '["data", "statistics"]')
      ON CONFLICT (name) DO NOTHING
    `

    return NextResponse.json({
      message: "✅ Database initialized successfully",
      tables: ["tools", "executions"],
      indexes: ["idx_executions_tool_name", "idx_executions_status", "idx_executions_created_at", "idx_tools_category"],
      sampleTools: 3,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to initialize database",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Check if tables exist
    const toolsTable = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'tools'
      )
    `

    const executionsTable = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'executions'
      )
    `

    // Get table counts
    const toolsCount = await sql`SELECT COUNT(*) as count FROM tools`
    const executionsCount = await sql`SELECT COUNT(*) as count FROM executions`

    return NextResponse.json({
      message: "📊 Database status retrieved",
      tables: {
        tools: {
          exists: toolsTable.rows[0].exists,
          count: toolsCount.rows[0].count
        },
        executions: {
          exists: executionsTable.rows[0].exists,
          count: executionsCount.rows[0].count
        }
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to check database status",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}