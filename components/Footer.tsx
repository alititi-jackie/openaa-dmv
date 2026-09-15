import Link from 'next/link'
import { dmvStates } from '@/lib/dmv-data'
import { getOpenAAUrl, OPENAA_DMV_URL } from '@/lib/site'

export default function Footer() {
  const liveStates = dmvStates.filter((state) => state.status === 'live').slice(0, 6)

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-extrabold text-slate-950">OpenAA DMV</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            OpenAA DMV 提供美国各州驾照题库、模拟考试、交通标志学习和官方入口整理；多数已上线内容支持中文、English 和中英对照。本站不是政府网站，正式考试规则、费用、预约和证件要求请以各州官方页面为准。
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-950">热门州</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            {liveStates.map((state) => (
              <Link key={state.slug} href={`/${state.slug}`} className="hover:text-slate-950">
                {state.nameZh} {state.nameEn}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-950">OpenAA 主站</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <a href={OPENAA_DMV_URL} className="hover:text-slate-950">纽约 DMV</a>
            <a href={getOpenAAUrl('/jobs')} className="hover:text-slate-950">招聘</a>
            <a href={getOpenAAUrl('/housing')} className="hover:text-slate-950">租房</a>
            <a href={getOpenAAUrl('/news')} className="hover:text-slate-950">生活资讯</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
