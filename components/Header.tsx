'use client'

import Link from 'next/link'
import Image from 'next/image'
import ShareButton from '@/components/ShareButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dbe3ee] bg-white/95 backdrop-blur-[12px]">
      <div className="mx-auto flex min-h-[72px] max-w-[1040px] items-center gap-[22px] px-4 py-3 max-[760px]:min-h-16 max-[760px]:gap-1.5 max-[760px]:px-2.5 max-[760px]:py-2.5 max-[390px]:gap-1.5">
        <Link href="/" className="focus-ring shrink-0 text-[#0f172a]" aria-label="OpenAA DMV 首页">
          <span
            className="inline-flex flex-row flex-nowrap items-center whitespace-nowrap"
            style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap', gap: 9, whiteSpace: 'nowrap' }}
          >
            <Image
              src="/openaa-logo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="block h-9 w-9 shrink-0 rounded-[10px] max-[760px]:h-[30px] max-[760px]:w-[30px]"
            />
            <span className="inline-block shrink-0 whitespace-nowrap text-[23px] font-bold leading-none tracking-[-0.7px] max-[760px]:text-[21px] max-[390px]:text-[18px]">
              <em className="not-italic text-[#2563eb]">Open</em>AA DMV
            </span>
          </span>
        </Link>

        <nav className="ml-auto flex shrink-0 items-center gap-2 max-[760px]:gap-1.5" aria-label="网站导航与页面操作">
          <a
            href="https://go.openaa.com/"
            aria-label="打开 OpenAA 导航"
            title="OpenAA 导航"
            className="focus-ring inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-[#dbe3ee] bg-white text-[#334155] transition-colors hover:bg-[#f8fafc] max-[760px]:h-7 max-[760px]:w-7 max-[390px]:h-[27px] max-[390px]:w-[27px]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="max-[760px]:h-[17px] max-[760px]:w-[17px]"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </a>

          <ShareButton
            title="OpenAA DMV"
            iconOnly
            className="!h-[38px] !w-[38px] !shrink-0 !rounded-full !border-[#dbe3ee] !bg-white !p-0 !text-[#0f172a] hover:!bg-[#f8fafc] max-[760px]:!h-7 max-[760px]:!w-7 max-[390px]:!h-[27px] max-[390px]:!w-[27px]"
          />
        </nav>
      </div>
    </header>
  )
}
