import type { Metadata, Viewport } from 'next'
import './globals.css'
import StorageNotice from '@/components/StorageNotice'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GlobalNavigationButtons from '@/components/GlobalNavigationButtons'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '美国 DMV 驾照题库｜中文 English 中英对照练习 - OpenAA DMV',
    template: '%s | OpenAA DMV',
  },
  description: '美国各州 DMV 驾照笔试学习平台。按州练习题库、模拟考试、交通标志和错题，多数已上线州支持中文、English 和中英对照，并提供官方 DMV 入口。',
  keywords: ['DMV中文题库', '美国驾照中文考试', 'DMV中文考试', 'Permit中文题库', '美国驾照笔试', 'DMV模拟考试', 'DMV English practice', 'DMV中英对照', 'OpenAA DMV'],
  manifest: '/manifest.webmanifest',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'OpenAA DMV',
    url: SITE_URL,
    title: '美国 DMV 驾照题库｜中文 English 中英对照练习 - OpenAA DMV',
    description: '选择考试州，开始驾照题库、模拟考试和交通标志学习，多数州支持中文、English 和中英对照。',
  },
  twitter: {
    card: 'summary',
    title: '美国 DMV 驾照题库 - OpenAA DMV',
    description: '美国各州 DMV 驾照笔试题库、模拟考试和交通标志学习。',
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
        <StorageNotice />
        <main>{children}</main>
        <Footer />
        <GlobalNavigationButtons />
      </body>
    </html>
  )
}
