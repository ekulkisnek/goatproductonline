import { kv } from '@vercel/kv'

export async function GET(request: Request) {
  try {
    // Get current timestamp
    const timestamp = Date.now()
    
    // Increment visitor counter
    const visitorCount = await kv.incr('visitor_count')
    
    // Set a temporary key with TTL
    await kv.setex('last_visit', 300, timestamp) // 5 minutes TTL
    
    // Get some sample data
    const sampleData = await kv.get('sample_data')
    
    // If no sample data exists, create some
    if (!sampleData) {
      await kv.set('sample_data', JSON.stringify({
        created: timestamp,
        message: 'Hello from Vercel KV!',
        features: ['Redis-compatible', 'Serverless', 'Global replication']
      }))
    }
    
    // Get the data we just set
    const freshData = await kv.get('sample_data')
    
    return Response.json({
      message: "🗄️ Vercel KV (Redis) Demo",
      timestamp: new Date(timestamp).toISOString(),
      visitorCount,
      lastVisit: await kv.get('last_visit'),
      sampleData: freshData,
      features: [
        "Redis-compatible API",
        "Serverless scaling",
        "Global replication",
        "Automatic backups",
        "256MB free storage"
      ],
      capabilities: {
        dataTypes: ["String", "Hash", "List", "Set", "Sorted Set"],
        operations: ["GET", "SET", "INCR", "EXPIRE", "TTL"],
        persistence: "Automatic snapshots",
        replication: "Multi-region"
      },
      freeTierInfo: {
        storage: "256MB",
        requests: "Unlimited",
        bandwidth: "Included",
        regions: "Global"
      },
      demo: {
        note: "This counter persists across requests",
        currentCount: visitorCount,
        ttl: "Last visit expires in 5 minutes"
      }
    })
  } catch (error) {
    return Response.json({
      error: "KV connection failed",
      message: "Make sure KV_REST_API_URL and KV_REST_API_TOKEN are set in environment variables",
      timestamp: new Date().toISOString(),
      setup: {
        step1: "Go to Vercel Dashboard > Storage > KV",
        step2: "Create a new KV database",
        step3: "Copy the connection details to your .env.local",
        step4: "Redeploy your application"
      }
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const timestamp = Date.now()
    
    // Store the data with a unique key
    const key = `data_${timestamp}`
    await kv.set(key, JSON.stringify({
      ...body,
      storedAt: timestamp,
      ttl: 3600 // 1 hour
    }))
    
    // Set expiration
    await kv.expire(key, 3600)
    
    return Response.json({
      message: "✅ Data stored in KV",
      key,
      timestamp: new Date(timestamp).toISOString(),
      data: body,
      ttl: "1 hour",
      operations: {
        stored: true,
        expiration: "Set to 1 hour",
        key: key
      }
    })
  } catch (error) {
    return Response.json({
      error: "Failed to store data",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    
    if (!key) {
      return Response.json({
        error: "Key parameter required",
        example: "/api/kv-demo?key=data_1234567890"
      }, { status: 400 })
    }
    
    const result = await kv.del(key)
    
    return Response.json({
      message: "🗑️ Key deleted from KV",
      key,
      deleted: result === 1,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({
      error: "Failed to delete key",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
