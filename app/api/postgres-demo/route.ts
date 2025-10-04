import { sql } from '@vercel/postgres'

export async function GET(request: Request) {
  try {
    // Create a simple table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS demo_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    // Get current stats
    const userCount = await sql`SELECT COUNT(*) as count FROM demo_users`
    const recentUsers = await sql`
      SELECT * FROM demo_users 
      ORDER BY created_at DESC 
      LIMIT 5
    `
    
    return Response.json({
      message: "🐘 Vercel Postgres Demo",
      timestamp: new Date().toISOString(),
      stats: {
        totalUsers: userCount.rows[0].count,
        recentUsers: recentUsers.rows
      },
      features: [
        "Serverless PostgreSQL",
        "Automatic scaling",
        "Global replication",
        "Connection pooling",
        "1GB free storage"
      ],
      capabilities: {
        database: "PostgreSQL 15",
        connections: "Up to 20 concurrent",
        storage: "1GB free tier",
        backups: "Automatic daily",
        regions: "Global"
      },
      freeTierInfo: {
        storage: "1GB",
        rowReads: "1 billion per month",
        rowWrites: "100 million per month",
        connections: "20 concurrent max"
      },
      demo: {
        note: "This table persists across requests",
        currentUsers: userCount.rows[0].count,
        recentEntries: recentUsers.rows.length
      }
    })
  } catch (error) {
    return Response.json({
      error: "Postgres connection failed",
      message: "Make sure POSTGRES_URL is set in environment variables",
      timestamp: new Date().toISOString(),
      setup: {
        step1: "Go to Vercel Dashboard > Storage > Postgres",
        step2: "Create a new Postgres database",
        step3: "Copy the connection string to your .env.local",
        step4: "Redeploy your application"
      },
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body
    
    if (!name || !email) {
      return Response.json({
        error: "Name and email are required",
        example: { name: "John Doe", email: "john@example.com" }
      }, { status: 400 })
    }
    
    // Insert new user
    const result = await sql`
      INSERT INTO demo_users (name, email) 
      VALUES (${name}, ${email}) 
      RETURNING id, name, email, created_at
    `
    
    return Response.json({
      message: "✅ User created in Postgres",
      user: result.rows[0],
      timestamp: new Date().toISOString(),
      operations: {
        inserted: true,
        userId: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email
      }
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return Response.json({
        error: "Email already exists",
        message: "Please use a different email address",
        timestamp: new Date().toISOString()
      }, { status: 409 })
    }
    
    return Response.json({
      error: "Failed to create user",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, email } = body
    
    if (!id) {
      return Response.json({
        error: "User ID is required",
        example: { id: 1, name: "Updated Name", email: "updated@example.com" }
      }, { status: 400 })
    }
    
    // Update user
    const result = await sql`
      UPDATE demo_users 
      SET name = ${name}, email = ${email} 
      WHERE id = ${id} 
      RETURNING id, name, email, created_at
    `
    
    if (result.rows.length === 0) {
      return Response.json({
        error: "User not found",
        message: `No user found with ID ${id}`,
        timestamp: new Date().toISOString()
      }, { status: 404 })
    }
    
    return Response.json({
      message: "✅ User updated in Postgres",
      user: result.rows[0],
      timestamp: new Date().toISOString(),
      operations: {
        updated: true,
        userId: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email
      }
    })
  } catch (error) {
    return Response.json({
      error: "Failed to update user",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return Response.json({
        error: "User ID is required",
        example: "/api/postgres-demo?id=1"
      }, { status: 400 })
    }
    
    // Delete user
    const result = await sql`
      DELETE FROM demo_users 
      WHERE id = ${id} 
      RETURNING id, name, email
    `
    
    if (result.rows.length === 0) {
      return Response.json({
        error: "User not found",
        message: `No user found with ID ${id}`,
        timestamp: new Date().toISOString()
      }, { status: 404 })
    }
    
    return Response.json({
      message: "🗑️ User deleted from Postgres",
      deletedUser: result.rows[0],
      timestamp: new Date().toISOString(),
      operations: {
        deleted: true,
        userId: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email
      }
    })
  } catch (error) {
    return Response.json({
      error: "Failed to delete user",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
