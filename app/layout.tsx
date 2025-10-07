import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Goat Product Online',
  description: 'Goat Product Online — clean, fast, and professional storefront and profile.',
  keywords: 'Goat Product Online, storefront, business card, Next.js, Vercel',
  authors: [{ name: 'Goat Product Online' }],
  openGraph: {
    title: 'Goat Product Online',
    description: 'Clean, fast, and professional storefront and business profile.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goat Product Online',
    description: 'Clean, fast, and professional storefront and business profile.',
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
