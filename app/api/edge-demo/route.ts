import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  // Get request information
  const { searchParams } = new URL(request.url)
  const region = request.headers.get('x-vercel-ip-country') || 'unknown'
  const city = request.headers.get('x-vercel-ip-city') || 'unknown'
  const timezone = request.headers.get('x-vercel-ip-timezone') || 'unknown'
  
  // Simulate edge processing
  const processingTime = Date.now() - startTime
  
  return NextResponse.json({
    message: "⚡ Edge Function Demo",
    timestamp: new Date().toISOString(),
    processingTime: `${processingTime}ms`,
    location: {
      region,
      city,
      timezone,
      country: request.headers.get('x-vercel-ip-country') || 'unknown'
    },
    features: [
      "Ultra-low latency (sub-50ms)",
      "Global edge deployment",
      "WebAssembly support",
      "Streaming responses",
      "Request/Response transformation"
    ],
    edgeCapabilities: {
      runtime: "Edge Runtime",
      memory: "128MB",
      timeout: "30 seconds",
      regions: "Global (200+ locations)"
    },
    request: {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent'),
      acceptLanguage: request.headers.get('accept-language'),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    },
    freeTierInfo: {
      invocations: "500,000 per month",
      executionTime: "Included in bandwidth",
      memory: "128MB max",
      timeout: "30 seconds max"
    },
    demo: {
      note: "This response was generated at the edge closest to you",
      latency: `${processingTime}ms`,
      edgeLocation: `${city}, ${region}`
    }
  })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  
  return NextResponse.json({
    message: "⚡ Edge Function POST Demo",
    timestamp: new Date().toISOString(),
    bodySize: body.length,
    processing: "Handled at edge location",
    features: [
      "Real-time data processing",
      "Image optimization",
      "A/B testing",
      "Personalization",
      "Bot detection"
    ]
  })
}
