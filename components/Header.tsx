'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ShareButton from '@/components/ShareButton'
import { OPENAA_DMV_URL } from '@/lib/site'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="dmv-site-header">
      <div className="dmv-header-inner">
        <Link href="/" className="dmv-brand focus-ring" aria-label="OpenAA DMV 首页">
          <Image src="/openaa-logo.png" alt="" width={36} height={36} priority />
          <span className="dmv-brand-text"><em>Open</em>AA DMV</span>
        </Link>

        <nav className="dmv-site-nav" aria-label="主导航">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className="focus-ring">
            首页
          </Link>
          <a href={OPENAA_DMV_URL} target="_blank" rel="noopener noreferrer" className="focus-ring">
            OpenAA DMV
          </a>
        </nav>

        <div className="dmv-header-actions" aria-label="页面操作">
          <ShareButton title="OpenAA DMV" iconOnly className="dmv-header-share" />
        </div>
      </div>

      <style jsx>{`
        .dmv-site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.93);
          border-bottom: 1px solid #dbe3ee;
          backdrop-filter: blur(12px);
        }

        .dmv-header-inner {
          max-width: 1080px;
          margin: auto;
          min-height: 72px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .dmv-brand {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-start;
          gap: 9px;
          color: #0f172a;
          flex: 0 0 auto;
          white-space: nowrap;
          text-decoration: none;
        }

        .dmv-brand :global(img) {
          display: block;
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          border-radius: 10px;
        }

        .dmv-brand-text {
          display: inline-block;
          flex: 0 0 auto;
          margin: 0;
          font-size: 23px;
          font-weight: 700;
          letter-spacing: -0.7px;
          line-height: 1;
          white-space: nowrap;
          color: #0f172a;
        }

        .dmv-brand-text em {
          font-style: normal;
          color: #2563eb;
        }

        .dmv-site-nav {
          margin-left: auto;
          display: flex;
          gap: 24px;
          align-items: center;
          flex-shrink: 0;
        }

        .dmv-site-nav :global(a) {
          font-size: 14px;
          color: #475569;
          white-space: nowrap;
          text-decoration: none;
        }

        .dmv-site-nav :global(a[aria-current='page']) {
          color: #2563eb !important;
          font-weight: 700;
        }

        .dmv-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .dmv-header-actions :global(.dmv-header-share) {
          width: 38px !important;
          height: 38px !important;
          padding: 0 !important;
          border: 1px solid #dbe3ee !important;
          border-radius: 50% !important;
          background: #fff !important;
          color: #0f172a !important;
          display: grid !important;
          place-items: center !important;
          flex-shrink: 0;
        }

        .dmv-header-actions :global(.dmv-header-share svg) {
          width: 19px;
          height: 19px;
        }

        @media (max-width: 760px) {
          .dmv-header-inner {
            min-height: 64px;
            padding: 10px;
            gap: 6px;
          }

          .dmv-brand {
            gap: 7px;
          }

          .dmv-brand :global(img) {
            width: 30px;
            height: 30px;
            flex-basis: 30px;
          }

          .dmv-brand-text {
            font-size: 21px;
          }

          .dmv-site-nav {
            gap: 8px;
          }

          .dmv-site-nav :global(a) {
            font-size: 12px;
          }

          .dmv-header-actions {
            gap: 5px;
          }

          .dmv-header-actions :global(.dmv-header-share) {
            width: 28px !important;
            height: 28px !important;
          }

          .dmv-header-actions :global(.dmv-header-share svg) {
            width: 16px;
            height: 16px;
          }
        }

        @media (max-width: 390px) {
          .dmv-header-inner {
            gap: 5px;
          }

          .dmv-brand {
            gap: 6px;
          }

          .dmv-brand-text {
            font-size: 18px;
          }

          .dmv-site-nav {
            gap: 7px;
          }

          .dmv-site-nav :global(a) {
            font-size: 11px;
          }

          .dmv-header-actions {
            gap: 4px;
          }

          .dmv-header-actions :global(.dmv-header-share) {
            width: 27px !important;
            height: 27px !important;
          }
        }
      `}</style>
    </header>
  )
}
