'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { BookOpenCheck, ExternalLink, MapPinned } from 'lucide-react'
import ShareButton from '@/components/ShareButton'
import { OPENAA_URL } from '@/lib/site'

const STATE_SLUGS = new Set(['california', 'new-jersey', 'pennsylvania', 'massachusetts', 'washington', 'texas', 'florida', 'ny'])

export default function Header() {
  const pathname = usePathname()
  const segment = pathname.split('/').filter(Boolean)[0]
  const practiceHref = segment && STATE_SLUGS.has(segment) ? `/${segment}/practice` : null
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-2 rounded-md" aria-label="OpenAA DMV 首页">
          <Image src="/openaa-logo.png" alt="" width={36} height={36} className="h-8 w-8 rounded-md object-contain sm:h-9 sm:w-9" priority />
          <span className="min-w-0">
            <span className="block whitespace-nowrap text-sm font-extrabold leading-5 text-slate-950 sm:text-base">OpenAA DMV</span>
            <span className="block whitespace-nowrap text-[10px] font-medium text-slate-500 sm:text-xs">美国驾照题库</span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1.5 text-sm font-semibold sm:gap-2">
          <Link href="/#states" className="focus-ring hidden rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 sm:inline-flex">
            <MapPinned size={16} className="mr-1.5" />
            选择州
          </Link>
          {practiceHref ? <Link href={practiceHref} className="focus-ring hidden rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 sm:inline-flex">
            <BookOpenCheck size={16} className="mr-1.5" />
            当前州练习
          </Link> : null}
          <a
            href={OPENAA_URL}
            className="focus-ring inline-flex items-center rounded-md border border-slate-200 px-2 py-2 text-xs text-slate-800 hover:bg-slate-100 sm:px-3 sm:text-sm"
          >
            OpenAA
            <ExternalLink size={15} className="ml-1.5" />
          </a>
          <ShareButton title="OpenAA DMV" iconOnly />
        </nav>
      </div>
    </header>
  )
}
