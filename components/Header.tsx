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
    <header className="sticky top-0 z-50 border-b border-[#dbe3ee] bg-white/95 backdrop-blur-[12px]">
      <div className="mx-auto flex min-h-[72px] max-w-[1080px] items-center gap-[22px] px-5 py-3 max-[760px]:min-h-16 max-[760px]:gap-1.5 max-[760px]:px-2.5 max-[760px]:py-2.5 max-[390px]:gap-1.5">
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

        <nav className="ml-auto flex shrink-0 items-center gap-6 max-[760px]:gap-2 max-[390px]:gap-[7px]" aria-label="主导航">
          <Link
            href="/"
            aria-current={isHome ? 'page' : undefined}
            className="focus-ring whitespace-nowrap text-sm max-[760px]:text-xs max-[390px]:text-[11px]"
            style={{ color: isHome ? '#2563eb' : '#475569', fontWeight: isHome ? 700 : 400 }}
          >
            首页
          </Link>
          <a
            href={OPENAA_DMV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring whitespace-nowrap text-sm text-[#475569] max-[760px]:text-xs max-[390px]:text-[11px]"
          >
            OpenAA DMV
          </a>
        </nav>

        <ShareButton
          title="OpenAA DMV"
          iconOnly
          className="!h-[38px] !w-[38px] !shrink-0 !rounded-full !border-[#dbe3ee] !bg-white !p-0 !text-[#0f172a] max-[760px]:!h-7 max-[760px]:!w-7 max-[390px]:!h-[27px] max-[390px]:!w-[27px]"
        />
      </div>
    </header>
  )
}
