'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import ShareButton from '@/components/ShareButton'
import { OPENAA_DMV_URL } from '@/lib/site'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between gap-1.5 sm:gap-4">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2 rounded-md" aria-label="OpenAA DMV 首页">
          <Image src="/openaa-logo.png" alt="" width={36} height={36} className="h-8 w-8 rounded-md object-contain sm:h-9 sm:w-9" priority />
          <span className="hidden min-w-0 sm:block">
            <span className="block whitespace-nowrap text-base font-extrabold leading-5 text-slate-950">OpenAA DMV</span>
            <span className="block whitespace-nowrap text-xs font-medium text-slate-500">美国驾照题库</span>
          </span>
        </Link>
        <nav className="flex min-w-0 shrink-0 items-center gap-1 text-sm font-semibold sm:gap-2">
          <Link
            href="/"
            aria-current={isHome ? 'page' : undefined}
            className={`focus-ring inline-flex items-center whitespace-nowrap rounded-md px-2 py-2 text-xs transition sm:px-3 sm:text-sm ${
              isHome
                ? 'font-bold text-blue-700'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            首页
          </Link>
          <a
            href={OPENAA_DMV_URL}
            className="focus-ring inline-flex items-center whitespace-nowrap rounded-md border border-slate-200 px-2 py-2 text-xs text-slate-800 hover:bg-slate-100 sm:px-3 sm:text-sm"
          >
            OpenAA DMV
            <ExternalLink size={14} className="ml-1 shrink-0 sm:ml-1.5 sm:size-[15px]" />
          </a>
          <ShareButton title="OpenAA DMV" iconOnly />
        </nav>
      </div>
    </header>
  )
}
