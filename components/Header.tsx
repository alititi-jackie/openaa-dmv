'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BookOpenCheck, ExternalLink, MapPinned } from 'lucide-react'
import { OPENAA_URL } from '@/lib/site'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-2 rounded-md" aria-label="OpenAA DMV 首页">
          <Image src="/openaa-logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-md object-contain" priority />
          <span className="min-w-0">
            <span className="block text-base font-extrabold leading-5 text-slate-950">OpenAA DMV</span>
            <span className="block text-xs font-medium text-slate-500">美国驾照中文题库</span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-2 text-sm font-semibold">
          <Link href="/#states" className="focus-ring hidden rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 sm:inline-flex">
            <MapPinned size={16} className="mr-1.5" />
            选择州
          </Link>
          <Link href="/california/practice" className="focus-ring hidden rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 sm:inline-flex">
            <BookOpenCheck size={16} className="mr-1.5" />
            开始练习
          </Link>
          <a
            href={OPENAA_URL}
            className="focus-ring inline-flex items-center rounded-md border border-slate-200 px-3 py-2 text-slate-800 hover:bg-slate-100"
          >
            OpenAA
            <ExternalLink size={15} className="ml-1.5" />
          </a>
        </nav>
      </div>
    </header>
  )
}
