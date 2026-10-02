import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import SeoGuideAccordion from '@/components/SeoGuideAccordion'

export const metadata: Metadata = {
  title: '美国各州 DMV 中文考试指南',
  description: '纽约、加州、新泽西、宾州、麻州、华盛顿州、德州、佛州 DMV 驾照笔试中文题库、模拟考试、考试规则、交通标志和驾驶手册导航。',
  alternates: { canonical: '/guide' },
}

const linkLabels = [
  ['dmv-chinese-test', '中文题库'],
  ['english-practice', '英文练习'],
  ['bilingual-practice', '中英对照'],
  ['dmv-practice', '在线练习'],
  ['dmv-mock-test', '中文模拟考试'],
  ['written-test', '驾照笔试'],
  ['permit-test', 'Permit Test'],
  ['test-rules', '考试规则'],
  ['road-signs', '交通标志'],
  ['driver-handbook', '驾驶手册'],
] as const

const stateConfig = [
  { name: '纽约州', englishName: 'New York', path: '/ny' },
  { name: '加州', englishName: 'California', path: '/california' },
  { name: '新泽西州', englishName: 'New Jersey', path: '/new-jersey' },
  { name: '宾夕法尼亚州', englishName: 'Pennsylvania', path: '/pennsylvania' },
  { name: '麻萨诸塞州', englishName: 'Massachusetts', path: '/massachusetts' },
  { name: '华盛顿州', englishName: 'Washington', path: '/washington' },
  { name: '德州', englishName: 'Texas', path: '/texas' },
  { name: '佛州', englishName: 'Florida', path: '/florida' },
]

const states = stateConfig.map((state) => ({
  name: state.name,
  englishName: state.englishName,
  links: linkLabels.map(([slug, label]) => ({
    label,
    href: `${state.path}/${slug}`,
  })),
}))

export default function GuidePage() {
  return (
    <section className="bg-slate-50 py-6 md:py-10">
      <div className="page-shell">
        <Link
          href="/"
          className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          返回首页
        </Link>

        <div className="mx-auto mt-7 max-w-3xl text-center md:mt-10">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">美国各州 DMV 中文考试指南</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
            选择州后展开对应的题库、模拟考试、考试规则和驾驶手册。
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl md:mt-10">
          <SeoGuideAccordion states={states} />
        </div>
      </div>
    </section>
  )
}
