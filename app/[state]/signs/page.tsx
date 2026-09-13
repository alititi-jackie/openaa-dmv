import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import QuestionsClient from '@/components/QuestionsClient'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getQuestionsByCategory } from '@/lib/question-bank'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() {
  return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  const isCalifornia = state.slug === 'california'
  return {
    title: isCalifornia ? '2026 加州 DMV 交通标志题库｜中英文识图练习' : `${state.nameZh} DMV 交通标志练习`,
    description: isCalifornia
      ? '加州 DMV 交通标志专项题库，支持中文、English 和中英对照，练习 STOP、YIELD、WRONG WAY、DO NOT ENTER、铁路、学校区域和道路标线等常见考点。'
      : stateDescription(state),
    alternates: { canonical: `/${state.slug}/signs` },
  }
}

export default async function SignsPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const isCalifornia = state.slug === 'california'
  const allSignQuestions = getQuestionsByCategory(state.slug, 'signs')

  // California 曾同时叠加公共、CA 核心和 CA 扩展三套标志题，导致 STOP、YIELD、
  // 铁路、学校等相同考点重复。专项页只使用已逐题配图和复核的 ca2-signs-001~020
  // 作为唯一 canonical 视觉题集，避免用“换一种问法”制造重复题。
  const signQuestions = isCalifornia
    ? allSignQuestions.filter((question) => /^ca2-signs-(?:00[1-9]|01\d|020)$/.test(question.id))
    : allSignQuestions

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(isCalifornia ? '2026 加州 DMV 交通标志题库' : `${state.nameZh} DMV 交通标志练习`, isCalifornia ? '加州 DMV 交通标志、信号和道路标线中英文专项题库。' : stateDescription(state), `/${state.slug}/signs`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '交通标志', path: `/${state.slug}/signs` }])} />
      <div className="page-shell">
        {isCalifornia ? <BackLink href="/california" label="返回加州 DMV" /> : null}
        <div className="mb-6">
          <p className="text-sm font-bold text-teal-700">Road Signs</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{isCalifornia ? '加州 DMV 交通标志题库' : `${state.nameZh} DMV 交通标志练习`}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            {isCalifornia
              ? `共 ${signQuestions.length} 道去重后的交通标志、铁路、路缘和道路标线识图题。每个核心考点只保留一题，支持中文、English 和中英对照。`
              : `共 ${signQuestions.length} 道交通标志、信号和道路标线专项题。支持中文、English 和中英对照。`}
          </p>
        </div>
        <QuestionsClient questions={signQuestions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} />
      </div>
    </section>
  )
}
