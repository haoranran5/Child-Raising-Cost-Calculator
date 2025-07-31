import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '养娃成本计算器',
  description: '科学计算养育孩子的成本，帮助家庭做出明智的财务规划决策',
  keywords: ['养娃成本', '育儿费用', '家庭理财', '教育支出', '成本计算器'],
  authors: [{ name: '养娃成本计算器团队' }],
  creator: '养娃成本计算器',
  publisher: '养娃成本计算器',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://child-cost-calculator.com'),
  openGraph: {
    title: '养娃成本计算器',
    description: '科学计算养育孩子的成本，帮助家庭做出明智的财务规划决策',
    url: 'https://child-cost-calculator.com',
    siteName: '养娃成本计算器',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '养娃成本计算器',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '养娃成本计算器',
    description: '科学计算养育孩子的成本，帮助家庭做出明智的财务规划决策',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#667eea" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen bg-background">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
