import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vercel Free Tier Demo - Complete Feature Showcase',
  description: 'Comprehensive demonstration of all Vercel free tier features including serverless functions, edge functions, databases, storage, and more.',
  keywords: 'Vercel, Next.js, serverless, edge functions, free tier, demo',
  authors: [{ name: 'Vercel Free Tier Demo' }],
  openGraph: {
    title: 'Vercel Free Tier Demo',
    description: 'Complete showcase of Vercel free tier capabilities',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vercel Free Tier Demo',
    description: 'Complete showcase of Vercel free tier capabilities',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
