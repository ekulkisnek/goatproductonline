import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { put, del, list } from '@vercel/blob'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const executionId = searchParams.get('executionId')
    const toolName = searchParams.get('toolName')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (executionId) {
      // Get specific result
      const result = await sql`
        SELECT * FROM executions WHERE id = ${executionId}
      `

      if (result.rows.length === 0) {
        return NextResponse.json({
          error: "Result not found",
          executionId
        }, { status: 404 })
      }

      return NextResponse.json({
        message: "📊 Result details retrieved",
        result: result.rows[0],
        timestamp: new Date().toISOString()
      })
    } else {
      // Get results with optional filters
      let result
      
      if (toolName) {
        result = await sql`
          SELECT * FROM executions 
          WHERE status = 'completed' AND tool_name = ${toolName}
          ORDER BY completed_at DESC 
          LIMIT ${limit}
        `
      } else {
        result = await sql`
          SELECT * FROM executions 
          WHERE status = 'completed'
          ORDER BY completed_at DESC 
          LIMIT ${limit}
        `
      }

      return NextResponse.json({
        message: "📋 Results retrieved",
        results: result.rows,
        count: result.rows.length,
        filters: {
          toolName: toolName || 'all',
          limit
        },
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    return NextResponse.json({
      error: "Failed to retrieve results",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { executionId, resultData, fileName, contentType } = body

    if (!executionId || !resultData) {
      return NextResponse.json({
        error: "Execution ID and result data are required",
        example: {
          executionId: "exec_1234567890_abc123",
          resultData: "Hello World",
          fileName: "output.txt",
          contentType: "text/plain"
        }
      }, { status: 400 })
    }

    // Save result to blob storage
    const blob = await put(`${executionId}/${fileName || 'result.txt'}`, resultData, {
      access: 'public',
      addRandomSuffix: false,
      contentType: contentType || 'text/plain'
    })

    // Update execution record with result file
    await sql`
      UPDATE executions 
      SET result_file_url = ${blob.url},
          result_file_name = ${fileName || 'result.txt'},
          updated_at = NOW()
      WHERE id = ${executionId}
    `

    return NextResponse.json({
      message: "✅ Result saved successfully",
      executionId,
      resultUrl: blob.url,
      fileName: fileName || 'result.txt',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to save result",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const executionId = searchParams.get('executionId')

    if (!executionId) {
      return NextResponse.json({
        error: "Execution ID is required",
        example: "/api/results?executionId=exec_1234567890_abc123"
      }, { status: 400 })
    }

    // Get execution record
    const execution = await sql`
      SELECT * FROM executions WHERE id = ${executionId}
    `

    if (execution.rows.length === 0) {
      return NextResponse.json({
        error: "Execution not found",
        executionId
      }, { status: 404 })
    }

    const exec = execution.rows[0]

    // Delete result files from blob storage
    if (exec.result_url) {
      try {
        await del(exec.result_url)
      } catch (e) {
        // Ignore blob deletion errors
      }
    }

    if (exec.result_file_url) {
      try {
        await del(exec.result_file_url)
      } catch (e) {
        // Ignore blob deletion errors
      }
    }

    // Delete execution record
    await sql`
      DELETE FROM executions WHERE id = ${executionId}
    `

    return NextResponse.json({
      message: "🗑️ Result deleted successfully",
      executionId,
      deletedFiles: [exec.result_url, exec.result_file_url].filter(Boolean),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to delete result",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}