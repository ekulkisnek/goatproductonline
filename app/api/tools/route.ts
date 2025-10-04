import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const toolId = searchParams.get('id')

    if (toolId) {
      // Get specific tool
      const result = await sql`
        SELECT * FROM tools WHERE id = ${toolId}
      `

      if (result.rows.length === 0) {
        return NextResponse.json({
          error: "Tool not found",
          toolId
        }, { status: 404 })
      }

      return NextResponse.json({
        message: "🔧 Tool details retrieved",
        tool: result.rows[0],
        timestamp: new Date().toISOString()
      })
    } else {
      // Get tools with optional category filter
      let result
      
      if (category) {
        result = await sql`
          SELECT * FROM tools 
          WHERE category = ${category}
          ORDER BY created_at DESC
        `
      } else {
        result = await sql`
          SELECT * FROM tools 
          ORDER BY created_at DESC
        `
      }

      return NextResponse.json({
        message: "📋 Tools retrieved",
        tools: result.rows,
        count: result.rows.length,
        category: category || 'all',
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    return NextResponse.json({
      error: "Failed to retrieve tools",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, code, category, parameters, tags } = body

    if (!name || !code) {
      return NextResponse.json({
        error: "Name and code are required",
        example: {
          name: "My Calculator",
          description: "A simple calculator tool",
          code: "print(2 + 2)",
          category: "math",
          parameters: {},
          tags: ["calculator", "math"]
        }
      }, { status: 400 })
    }

    // Create tool record
    const result = await sql`
      INSERT INTO tools (name, description, code, category, parameters, tags, created_at)
      VALUES (${name}, ${description || ''}, ${code}, ${category || 'custom'}, ${JSON.stringify(parameters || {})}, ${JSON.stringify(tags || [])}, NOW())
      RETURNING id, name, description, category, created_at
    `

    return NextResponse.json({
      message: "✅ Tool created successfully",
      tool: result.rows[0],
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to create tool",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, description, code, category, parameters, tags } = body

    if (!id) {
      return NextResponse.json({
        error: "Tool ID is required",
        example: { id: 1, name: "Updated Tool", code: "print('updated')" }
      }, { status: 400 })
    }

    // Update tool
    const result = await sql`
      UPDATE tools 
      SET name = ${name}, 
          description = ${description}, 
          code = ${code}, 
          category = ${category}, 
          parameters = ${JSON.stringify(parameters || {})}, 
          tags = ${JSON.stringify(tags || [])},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, name, description, category, updated_at
    `

    if (result.rows.length === 0) {
      return NextResponse.json({
        error: "Tool not found",
        toolId: id
      }, { status: 404 })
    }

    return NextResponse.json({
      message: "✅ Tool updated successfully",
      tool: result.rows[0],
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to update tool",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        error: "Tool ID is required",
        example: "/api/tools?id=1"
      }, { status: 400 })
    }

    // Delete tool
    const result = await sql`
      DELETE FROM tools 
      WHERE id = ${id}
      RETURNING id, name, category
    `

    if (result.rows.length === 0) {
      return NextResponse.json({
        error: "Tool not found",
        toolId: id
      }, { status: 404 })
    }

    return NextResponse.json({
      message: "🗑️ Tool deleted successfully",
      deletedTool: result.rows[0],
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      error: "Failed to delete tool",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}