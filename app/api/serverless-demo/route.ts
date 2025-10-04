import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  // Simulate some processing
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const processingTime = Date.now() - startTime
  
  return NextResponse.json({
    message: "🚀 Serverless Function Demo",
    timestamp: new Date().toISOString(),
    processingTime: `${processingTime}ms`,
    features: [
      "Auto-scaling based on demand",
      "Pay-per-request pricing",
      "Zero server management",
      "Automatic HTTPS",
      "Global edge deployment"
    ],
    request: {
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    },
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      region: process.env.VERCEL_REGION || 'unknown',
      environment: process.env.NODE_ENV || 'development'
    },
    freeTierInfo: {
      executionTime: "100GB-hours per month",
      invocations: "Unlimited",
      memory: "1024MB max",
      timeout: "10 seconds max"
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      message: "✅ POST request processed successfully",
      receivedData: body,
      timestamp: new Date().toISOString(),
      processing: {
        bodySize: JSON.stringify(body).length,
        contentType: request.headers.get('content-type'),
        method: request.method
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: "Invalid JSON in request body",
      timestamp: new Date().toISOString()
    }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  return NextResponse.json({
    message: "🔄 PUT request handled",
    resourceId: id,
    timestamp: new Date().toISOString(),
    action: "Update resource",
    status: "Success"
  })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  return NextResponse.json({
    message: "🗑️ DELETE request handled",
    resourceId: id,
    timestamp: new Date().toISOString(),
    action: "Delete resource",
    status: "Success"
  })
}
