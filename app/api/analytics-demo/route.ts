import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const event = searchParams.get('event') || 'page_view'
  const userId = searchParams.get('userId') || 'anonymous'
  
  // Simulate analytics data collection
  const analyticsData = {
    event,
    userId,
    timestamp: new Date().toISOString(),
    sessionId: `session_${Date.now()}`,
    page: request.headers.get('referer') || 'direct',
    userAgent: request.headers.get('user-agent'),
    country: request.headers.get('x-vercel-ip-country'),
    city: request.headers.get('x-vercel-ip-city'),
    language: request.headers.get('accept-language'),
    screen: {
      width: Math.floor(Math.random() * 1920) + 800,
      height: Math.floor(Math.random() * 1080) + 600
    },
    device: {
      type: request.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
      os: request.headers.get('user-agent')?.includes('Windows') ? 'Windows' : 'Other'
    }
  }
  
  return NextResponse.json({
    message: "📊 Analytics Demo",
    timestamp: new Date().toISOString(),
    analytics: analyticsData,
    features: [
      "Real-time analytics",
      "Custom event tracking",
      "User behavior analysis",
      "Performance monitoring",
      "Conversion tracking"
    ],
    capabilities: {
      events: ["page_view", "click", "scroll", "form_submit", "purchase"],
      metrics: ["bounce_rate", "session_duration", "page_views", "unique_visitors"],
      segmentation: ["country", "device", "browser", "traffic_source"],
      funnels: ["user_journey", "conversion_paths", "drop_off_points"]
    },
    freeTierInfo: {
      events: "Unlimited custom events",
      retention: "90 days data retention",
      users: "Unlimited tracked users",
      integrations: "All Vercel integrations included"
    },
    demo: {
      note: "This endpoint simulates analytics data collection",
      currentEvent: event,
      userId: userId,
      sessionId: analyticsData.sessionId
    },
    cursorAgent: {
      commands: [
        "# Track custom event",
        "curl '/api/analytics-demo?event=custom_event&userId=user123'",
        "",
        "# View analytics data",
        "curl '/api/analytics-demo'"
      ]
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties, userId } = body
    
    // Simulate event processing
    const processedEvent = {
      event: event || 'custom_event',
      properties: properties || {},
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString(),
      sessionId: `session_${Date.now()}`,
      processed: true
    }
    
    return NextResponse.json({
      message: "✅ Analytics Event Tracked",
      event: processedEvent,
      timestamp: new Date().toISOString(),
      processing: {
        received: true,
        validated: true,
        stored: true,
        eventId: `evt_${Date.now()}`
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: "Failed to process analytics event",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 400 })
  }
}
