import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Python Tools Platform - Run Python Code in the Cloud',
  description: 'Execute Python scripts, save results, and manage your tools with a powerful web interface. Built on Vercel\'s serverless platform.',
  keywords: 'Python, tools, execution, cloud, serverless, Vercel, Next.js',
  authors: [{ name: 'Python Tools Platform' }],
  openGraph: {
    title: 'Python Tools Platform',
    description: 'Run Python tools in the cloud with persistent storage and real-time execution',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Python Tools Platform',
    description: 'Run Python tools in the cloud with persistent storage and real-time execution',
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
