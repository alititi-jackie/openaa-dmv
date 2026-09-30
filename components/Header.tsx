'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ShareButton from '@/components/ShareButton'
import { OPENAA_DMV_URL } from '@/lib/site'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="page-shell flex min-h-16 items-center gap-1.5 px-2 py-2 sm:min-h-[72px] sm:gap-5 sm:px-5 sm:py-3">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-1.5 rounded-md text-slate-950 sm:gap-2" aria-label="OpenAA DMV 首页">
          <Image src="/openaa-logo.png" alt="" width={36} height={36} className="h-[30px] w-[30px] rounded-md object-contain sm:h-9 sm:w-9" priority />
          <span className="flex min-w-0 items-baseline gap-1.5 sm:gap-2.5">
            <strong className="whitespace-nowrap text-[17px] font-extrabold leading-none tracking-tight text-slate-950 sm:text-[21px]">OpenAA DMV</strong>
            <small className="whitespace-nowrap border-l border-slate-200 pl-1.5 text-[10px] font-medium text-slate-500 sm:pl-2.5 sm:text-xs">美国驾照题库</small>
          </span>
        </Link>

        <nav className="ml-auto flex min-w-0 shrink-0 items-center gap-1.5 text-xs font-semibold sm:gap-6 sm:text-sm" aria-label="主导航">
          <Link
            href="/"
            aria-current={isHome ? 'page' : undefined}
            className={`focus-ring whitespace-nowrap rounded-md ${isHome ? 'font-bold text-blue-600' : 'text-slate-600 hover:text-slate-950'}`}
          >
            首页
          </Link>
          <a
            href={OPENAA_DMV_URL}
            className="focus-ring whitespace-nowrap rounded-md text-slate-600 hover:text-slate-950"
          >
            OpenAA DMV
          </a>
        </nav>

        <ShareButton
          title="OpenAA DMV"
          iconOnly
          className="!h-7 !w-7 !rounded-full !border-slate-200 !text-slate-900 sm:!h-[38px] sm:!w-[38px]"
        />
      </div>

      <style jsx>{`
        @media (max-width: 360px) {
          :global(.page-shell) {
            padding-left: 8px;
            padding-right: 8px;
          }
          nav {
            gap: 5px;
            font-size: 10px;
          }
          strong {
            font-size: 15px;
          }
          small {
            padding-left: 5px;
            font-size: 9px;
          }
        }
      `}</style>
    </header>
  )
}
