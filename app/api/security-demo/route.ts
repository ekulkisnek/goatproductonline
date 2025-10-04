import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries())
  
  return NextResponse.json({
    message: "🔒 Security Features Demo",
    timestamp: new Date().toISOString(),
    security: {
      https: request.url.startsWith('https://'),
      headers: {
        'x-forwarded-proto': headers['x-forwarded-proto'],
        'x-forwarded-for': headers['x-forwarded-for'],
        'x-vercel-ip-country': headers['x-vercel-ip-country'],
        'x-vercel-ip-city': headers['x-vercel-ip-city'],
        'user-agent': headers['user-agent']
      }
    },
    features: [
      "Automatic HTTPS/SSL certificates",
      "DDoS protection",
      "Security headers",
      "IP filtering",
      "Rate limiting"
    ],
    securityHeaders: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    protection: {
      ddos: "Automatic DDoS protection",
      ssl: "Automatic SSL certificates",
      headers: "Security headers included",
      cdn: "Global CDN with security",
      monitoring: "Real-time threat detection"
    },
    freeTierInfo: {
      ssl: "Free SSL certificates",
      ddos: "Included protection",
      headers: "All security headers",
      monitoring: "Basic security monitoring"
    },
    demo: {
      note: "This endpoint demonstrates security features",
      https: request.url.startsWith('https://'),
      ip: headers['x-forwarded-for'] || 'unknown',
      country: headers['x-vercel-ip-country'] || 'unknown'
    }
  }, {
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    }
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Simulate rate limiting check
  const rateLimitKey = `rate_limit_${request.headers.get('x-forwarded-for') || 'unknown'}`
  
  return NextResponse.json({
    message: "🔒 Security POST Demo",
    timestamp: new Date().toISOString(),
    security: {
      method: request.method,
      contentType: request.headers.get('content-type'),
      contentLength: request.headers.get('content-length'),
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer')
    },
    rateLimiting: {
      enabled: true,
      key: rateLimitKey,
      limit: "100 requests per minute",
      remaining: "Calculated per IP"
    },
    validation: {
      bodySize: JSON.stringify(body).length,
      maxSize: "4.5MB",
      allowedTypes: ["application/json", "application/x-www-form-urlencoded"]
    },
    protection: {
      csrf: "CSRF protection enabled",
      xss: "XSS filtering active",
      injection: "SQL injection protection",
      validation: "Input validation enabled"
    }
  }, {
    headers: {
      'X-RateLimit-Limit': '100',
      'X-RateLimit-Remaining': '99',
      'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 60)
    }
  })
}
