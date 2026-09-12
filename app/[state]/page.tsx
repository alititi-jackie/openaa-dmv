import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import StateHero from '@/components/StateHero'
import ToolGrid from '@/components/ToolGrid'
import { dmvStates, getQuestionsForState, getStateBySlug } from '@/lib/dmv-data'
import { breadcrumbJsonLd, faqJsonLd, stateDescription, stateTitle, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() {
  return dmvStates.filter((state) => state.status !== 'external').map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getStateBySlug(stateSlug)
  if (!state || state.status === 'external') return {}
  const title = stateTitle(state)
  const description = stateDescription(state)
  return {
    title,
    description,
    alternates: { canonical: `/${state.slug}` },
    openGraph: { title, description, url: `/${state.slug}` },
  }
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getStateBySlug(stateSlug)
  if (!state || state.status === 'external') notFound()

  if (state.status === 'coming-soon') {
    return (
      <section className="bg-white py-16">
        <div className="page-shell">
          <div className="card p-6">
            <p className="text-sm font-bold text-amber-800">题库准备中</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">{state.nameZh} DMV 中文题库</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">{state.summary}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={state.officialUrl} className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">打开官方 DMV</a>
              <Link href="/" className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">返回选州</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const questions = getQuestionsForState(state.slug)
  const faq = [
    {
      question: `${state.nameZh} DMV 中文题库可以直接代替官方手册吗？`,
      answer: `不可以。本站用于中文学习辅助，正式规则、费用和预约以 ${state.officialName} 官方页面为准。`,
    },
    {
      question: `${state.shortZh} DMV 练习需要登录吗？`,
      answer: '第一版不需要登录，练习和错题默认保存在当前浏览器本地。',
    },
    {
      question: '纽约 DMV 中文题库为什么跳到 OpenAA 主站？',
      answer: '纽约内容已由 OpenAA 主站承接，dmv.openaa.com 主要用于扩展其他州。',
    },
  ]

  return (
    <>
      <JsonLd data={webPageJsonLd(stateTitle(state), stateDescription(state), `/${state.slug}`)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }])} />
      <StateHero state={state} />
      <ToolGrid state={state} />
      <section className="bg-[#f4f7fb] py-10">
        <div className="page-shell grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">{state.nameZh} 考试指南</h2>
            <div className="mt-4 grid gap-3">
              {state.guide.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-md bg-slate-50 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-700 text-sm font-black text-white">{index + 1}</span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">官方入口</h2>
            <div className="mt-4 grid gap-2 text-sm font-bold text-blue-800">
              <a href={state.officialUrl}>官方首页</a>
              <a href={state.driverManualUrl}>Driver Manual</a>
              <a href={state.permitUrl}>Permit / License 申请</a>
              <a href={state.roadTestUrl}>Road Test / Drive Test</a>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">所有外部链接均指向官方机构页面或 OpenAA 主站。</p>
          </div>
        </div>
      </section>
      <section className="bg-white py-10">
        <div className="page-shell">
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">题库概览</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              当前开放 {questions.length} 道中文练习题，覆盖道路规则、交通标志、安全驾驶和证件流程。后续可以按州继续补充官方手册对应题库。
            </p>
            <Link href={`/${state.slug}/questions`} className="focus-ring mt-5 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">
              查看全部题目
            </Link>
          </div>
        </div>
      </section>
      <OpenAACrossLinks />
    </>
  )
}
