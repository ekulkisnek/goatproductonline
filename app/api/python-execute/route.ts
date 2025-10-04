import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, toolName, parameters } = body

    if (!code) {
      return NextResponse.json({
        error: "Python code is required",
        example: { code: "print('Hello World')", toolName: "hello_world" }
      }, { status: 400 })
    }

    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const startTime = Date.now()

    // Create execution record in database
    await sql`
      INSERT INTO executions (id, tool_name, code, parameters, status, created_at)
      VALUES (${executionId}, ${toolName || 'custom'}, ${code}, ${JSON.stringify(parameters || {})}, 'running', NOW())
    `

    try {
      // Execute Python code using Node.js child_process
      const { spawn } = require('child_process')
      
      // Create a temporary Python file
      const pythonCode = `
import sys
import json
import traceback
import io
from contextlib import redirect_stdout, redirect_stderr

# Capture stdout and stderr
stdout_capture = io.StringIO()
stderr_capture = io.StringIO()

try:
    with redirect_stdout(stdout_capture), redirect_stderr(stderr_capture):
        # Execute the user's code
        exec("""${code.replace(/"/g, '\\"')}""")
    
    # Get captured output
    stdout_output = stdout_capture.getvalue()
    stderr_output = stderr_capture.getvalue()
    
    # Prepare result
    result = {
        "success": True,
        "stdout": stdout_output,
        "stderr": stderr_output,
        "error": None
    }
    
except Exception as e:
    result = {
        "success": False,
        "stdout": stdout_capture.getvalue(),
        "stderr": stderr_capture.getvalue(),
        "error": str(e),
        "traceback": traceback.format_exc()
    }

# Output result as JSON
print(json.dumps(result))
`

      // Execute Python code
      const pythonProcess = spawn('python3', ['-c', pythonCode], {
        timeout: 30000, // 30 second timeout
        stdio: ['pipe', 'pipe', 'pipe']
      })

      let stdout = ''
      let stderr = ''

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      const executionResult = await new Promise<any>((resolve, reject) => {
        pythonProcess.on('close', (code) => {
          try {
            const result = JSON.parse(stdout)
            resolve(result)
          } catch (e) {
            resolve({
              success: false,
              stdout: stdout,
              stderr: stderr,
              error: 'Failed to parse Python output',
              exitCode: code
            })
          }
        })

        pythonProcess.on('error', (error) => {
          resolve({
            success: false,
            stdout: stdout,
            stderr: stderr,
            error: error.message
          })
        })
      })

      const endTime = Date.now()
      const executionTime = endTime - startTime

      // Save execution result to blob storage
      const resultBlob = await put(`${executionId}/result.json`, JSON.stringify({
        executionId,
        toolName: toolName || 'custom',
        code,
        parameters: parameters || {},
        result: executionResult,
        executionTime,
        timestamp: new Date().toISOString()
      }), {
        access: 'public',
        addRandomSuffix: false
      })

      // Update execution record
      await sql`
        UPDATE executions 
        SET status = ${executionResult.success ? 'completed' : 'failed'},
            result_url = ${resultBlob.url},
            execution_time = ${executionTime},
            stdout = ${executionResult.stdout || ''},
            stderr = ${executionResult.stderr || ''},
            error = ${executionResult.error || null},
            completed_at = NOW()
        WHERE id = ${executionId}
      `

      return NextResponse.json({
        message: "🐍 Python code executed successfully",
        executionId,
        result: executionResult,
        executionTime: `${executionTime}ms`,
        resultUrl: resultBlob.url,
        timestamp: new Date().toISOString(),
        metadata: {
          toolName: toolName || 'custom',
          codeLength: code.length,
          parameters: parameters || {}
        }
      })

    } catch (executionError) {
      const endTime = Date.now()
      const executionTime = endTime - startTime

      // Update execution record with error
      await sql`
        UPDATE executions 
        SET status = 'failed',
            execution_time = ${executionTime},
            error = ${executionError instanceof Error ? executionError.message : 'Unknown error'},
            completed_at = NOW()
        WHERE id = ${executionId}
      `

      return NextResponse.json({
        error: "Python execution failed",
        executionId,
        message: executionError instanceof Error ? executionError.message : 'Unknown error',
        executionTime: `${executionTime}ms`,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

  } catch (error) {
    return NextResponse.json({
      error: "Failed to execute Python code",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const executionId = searchParams.get('id')

    if (executionId) {
      // Get specific execution
      const result = await sql`
        SELECT * FROM executions WHERE id = ${executionId}
      `

      if (result.rows.length === 0) {
        return NextResponse.json({
          error: "Execution not found",
          executionId
        }, { status: 404 })
      }

      return NextResponse.json({
        message: "📊 Execution details retrieved",
        execution: result.rows[0],
        timestamp: new Date().toISOString()
      })
    } else {
      // Get recent executions
      const result = await sql`
        SELECT id, tool_name, status, execution_time, created_at, completed_at
        FROM executions 
        ORDER BY created_at DESC 
        LIMIT 20
      `

      return NextResponse.json({
        message: "📋 Recent executions retrieved",
        executions: result.rows,
        count: result.rows.length,
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    return NextResponse.json({
      error: "Failed to retrieve executions",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}