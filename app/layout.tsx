import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GlobalNavigationButtons from '@/components/GlobalNavigationButtons'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '美国 DMV 中文题库｜各州驾照笔试练习 - OpenAA DMV',
    template: '%s | OpenAA DMV',
  },
  description: '美国各州 DMV 中文题库与驾照笔试练习平台。按州练习 Permit 笔试、模拟考试、交通标志和错题，并提供各州 DMV 官方入口。',
  keywords: ['DMV中文题库', '美国驾照中文考试', 'DMV中文考试', 'Permit中文题库', '美国驾照笔试', 'DMV模拟考试', 'OpenAA DMV'],
  manifest: '/manifest.webmanifest',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'OpenAA DMV',
    url: SITE_URL,
    title: '美国 DMV 中文题库｜各州驾照笔试练习 - OpenAA DMV',
    description: '选择所在州，开始 DMV 中文题库、Permit 笔试、模拟考试和交通标志练习。',
  },
  twitter: {
    card: 'summary',
    title: '美国 DMV 中文题库 - OpenAA DMV',
    description: '美国各州 DMV 中文驾照笔试练习、模拟考试和交通标志。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <GlobalNavigationButtons />
      </body>
    </html>
  )
}
