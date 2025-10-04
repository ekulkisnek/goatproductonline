import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const startTime = Date.now()
  
  // Get request information
  const url = request.nextUrl.clone()
  const pathname = url.pathname
  const userAgent = request.headers.get('user-agent') || ''
  const country = request.headers.get('x-vercel-ip-country') || 'unknown'
  const city = request.headers.get('x-vercel-ip-city') || 'unknown'
  
  // Add custom headers
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Add custom headers for demo
  response.headers.set('X-Middleware-Processed', 'true')
  response.headers.set('X-Processing-Time', `${Date.now() - startTime}ms`)
  response.headers.set('X-Request-Country', country)
  response.headers.set('X-Request-City', city)
  
  // Bot detection and handling
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent)
  if (isBot) {
    response.headers.set('X-Bot-Detected', 'true')
    response.headers.set('X-Bot-Type', userAgent)
  }
  
  // Rate limiting simulation (in real app, use Redis or similar)
  const rateLimitKey = `rate_limit_${request.ip || 'unknown'}`
  response.headers.set('X-Rate-Limit-Key', rateLimitKey)
  response.headers.set('X-Rate-Limit-Limit', '100')
  response.headers.set('X-Rate-Limit-Remaining', '99')
  response.headers.set('X-Rate-Limit-Reset', String(Math.floor(Date.now() / 1000) + 3600))
  
  // A/B testing simulation
  const abTestVariant = Math.random() > 0.5 ? 'A' : 'B'
  response.headers.set('X-AB-Test-Variant', abTestVariant)
  
  // Geographic routing
  if (country === 'US') {
    response.headers.set('X-Geo-Route', 'us-west')
  } else if (country === 'GB') {
    response.headers.set('X-Geo-Route', 'eu-west')
  } else {
    response.headers.set('X-Geo-Route', 'global')
  }
  
  // API route protection
  if (pathname.startsWith('/api/')) {
    // Add CORS headers for API routes
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    // Add API versioning
    response.headers.set('X-API-Version', '1.0.0')
    response.headers.set('X-API-Environment', process.env.NODE_ENV || 'development')
  }
  
  // Static file optimization
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    // Set long cache headers for static assets
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Redirects and rewrites
  if (pathname === '/docs') {
    return NextResponse.redirect(new URL('/features', request.url))
  }
  
  // Health check endpoint
  if (pathname === '/health') {
    return NextResponse.redirect(new URL('/api/status', request.url))
  }
  
  // Add middleware info to response
  response.headers.set('X-Middleware-Info', JSON.stringify({
    processed: true,
    timestamp: new Date().toISOString(),
    pathname,
    country,
    city,
    userAgent: userAgent.substring(0, 100),
    isBot,
    abTestVariant,
    processingTime: Date.now() - startTime
  }))
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
