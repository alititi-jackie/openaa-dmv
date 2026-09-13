import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import StateHero from '@/components/StateHero'
import ToolGrid from '@/components/ToolGrid'
import { dmvStates, getStateBySlug } from '@/lib/dmv-data'
import { getQuestionsForState } from '@/lib/question-bank'
import { breadcrumbJsonLd, faqJsonLd, stateDescription, stateTitle, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() {
  return dmvStates.filter((state) => state.status !== 'external').map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getStateBySlug(stateSlug)
  if (!state || state.status === 'external') return {}
  const title = state.slug === 'california' ? '2026 加州 DMV 中英双语题库｜驾照笔试练习与模拟考试' : stateTitle(state)
  const description = state.slug === 'california'
    ? '加州 DMV Class C 驾照知识考试中英双语学习入口，支持中文、English 和中英对照练习，包含模拟考试、交通标志、错题本、官方中文 Driver Handbook 和申请入口。'
    : stateDescription(state)
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
  const isCalifornia = state.slug === 'california'
  const faq = isCalifornia
    ? [
        {
          question: '加州 DMV 有官方中文 Driver Handbook 吗？',
          answer: '有。California DMV 官方 Driver’s Handbooks 页面提供中文版 California Driver’s Handbook PDF，考试前建议与本站练习配合使用。',
        },
        {
          question: '加州 DMV 是否提供中文 Class C 样题？',
          answer: '提供。California DMV 官方 Sample Driver’s License Knowledge Tests 页面提供中文 Class C 驾照知识考试样题。',
        },
        {
          question: '加州 DMV 题库需要登录吗？',
          answer: '不需要。练习记录和错题默认保存在当前浏览器本地，清理浏览器数据或更换设备后可能无法保留。',
        },
        {
          question: '本站题库可以代替 California Driver’s Handbook 吗？',
          answer: '不能。本站用于中英双语学习和模拟练习，正式考试规则、证件、费用与预约要求应以 California DMV 官方页面和 Driver’s Handbook 为准。',
        },
      ]
    : [
        {
          question: `${state.nameZh} DMV 中文题库可以直接代替官方手册吗？`,
          answer: `不可以。本站用于中文学习辅助，正式规则、费用和预约以 ${state.officialName} 官方页面为准。`,
        },
        {
          question: `${state.shortZh} DMV 练习需要登录吗？`,
          answer: '第一版不需要登录，练习和错题默认保存在当前浏览器本地。',
        },
      ]

  const pageTitle = isCalifornia ? '2026 加州 DMV 中英双语题库' : stateTitle(state)
  const pageDescription = isCalifornia
    ? `当前提供 ${questions.length} 道中英双语练习题，覆盖道路规则、交通标志、安全驾驶和证件流程，并配套模拟考试、错题本和官方 California DMV 学习入口。`
    : stateDescription(state)

  return (
    <>
      <JsonLd data={webPageJsonLd(pageTitle, pageDescription, `/${state.slug}`)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }])} />
      {isCalifornia ? (
        <div className="bg-white pt-6">
          <div className="page-shell">
            <BackLink href="/" label="返回美国 DMV 首页" />
          </div>
        </div>
      ) : null}
      <StateHero state={state} />
      <ToolGrid state={state} />

      {isCalifornia ? (
        <section className="bg-white py-10">
          <div className="page-shell grid gap-4 md:grid-cols-3">
            <div className="card p-5">
              <p className="text-sm font-bold text-teal-700">当前题库</p>
              <p className="mt-2 text-3xl font-black text-slate-950">{questions.length} 题</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">加州专属题 + 150 道公共核心题，支持中文、English 和中英对照。</p>
            </div>
            <div className="card p-5">
              <p className="text-sm font-bold text-teal-700">官方中文资料</p>
              <p className="mt-2 text-xl font-black text-slate-950">Driver Handbook</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">California DMV 官方提供中文驾驶手册和中文 Class C 样题。</p>
            </div>
            <div className="card p-5">
              <p className="text-sm font-bold text-teal-700">推荐学习顺序</p>
              <p className="mt-2 text-xl font-black text-slate-950">题库 → 模考 → 错题</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">先理解规则，再随机模拟，最后集中复习错题。</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#f4f7fb] py-10">
        <div className="page-shell grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">{state.nameZh} 考试准备步骤</h2>
            <div className="mt-4 grid gap-3">
              {(isCalifornia
                ? [
                    '先阅读 California DMV 官方 Driver’s Handbook；官方提供中文版本。',
                    '使用本站题库熟悉路权、车道线、交通标志、行人、自行车和安全驾驶，可切换中文、English 或中英对照。',
                    '完成多次模拟考试，把答错题目集中到错题本反复复习。',
                    '申请或预约前再次到 California DMV 官方页面核对证件、费用、考试方式和最新规定。',
                    '通过知识考试取得相应许可后，再按年龄和申请类型准备驾驶训练及路考。',
                  ]
                : state.guide
              ).map((item, index) => (
                <div key={item} className="flex gap-3 rounded-md bg-slate-50 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-700 text-sm font-black text-white">{index + 1}</span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <Link href={`/${state.slug}/guide`} className="focus-ring mt-5 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">
              查看完整考试指南
            </Link>
          </div>
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">官方入口</h2>
            <div className="mt-4 grid gap-2 text-sm font-bold text-blue-800">
              <a href={state.officialUrl}>{state.officialName} 官方首页</a>
              <a href={state.driverManualUrl}>California Driver’s Handbook</a>
              <a href={state.permitUrl}>Instruction Permit / License 申请</a>
              <a href={state.roadTestUrl}>Drive Test / Road Test</a>
              {isCalifornia ? <a href="https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/">官方 Class C 样题</a> : null}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">正式考试规则、申请资格、费用和预约信息请以官方页面最新内容为准。</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="page-shell">
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">{state.shortZh} DMV 题库概览</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              当前开放 {questions.length} 道练习题，覆盖道路规则、交通标志、安全驾驶和证件流程。练习页支持中文、English、中英对照及即时答案解析，{isCalifornia ? '模拟考试提供参考历史题量设计的 36 题和 46 题练习模式' : '模拟考试支持分类随机组卷'}，答错题目会保存到本地错题本。正式考试题量和要求以官方当日规定为准。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/${state.slug}/questions`} className="focus-ring inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">查看全部题目</Link>
              <Link href={`/${state.slug}/mock-test`} className="focus-ring inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">开始模拟考试</Link>
              <Link href={`/${state.slug}/wrong-questions`} className="focus-ring inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">复习错题</Link>
            </div>
          </div>
        </div>
      </section>
      <OpenAACrossLinks />
    </>
  )
}
