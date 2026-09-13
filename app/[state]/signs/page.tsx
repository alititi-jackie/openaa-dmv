import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import CaliforniaSignsClient from '@/components/CaliforniaSignsClient'
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
    title: isCalifornia ? '2026 加州 DMV 交通标志图形专项｜中文识图练习' : `${state.nameZh} DMV 交通标志中文练习`,
    description: isCalifornia
      ? '加州 DMV 交通标志图形专项：学习 STOP、YIELD、WRONG WAY、DO NOT ENTER、铁路、学校区域等常见标志，并进行中文识图和题库练习。'
      : stateDescription(state),
    alternates: { canonical: `/${state.slug}/signs` },
  }
}

export default async function SignsPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const isCalifornia = state.slug === 'california'
  const signQuestions = getQuestionsByCategory(state.slug, 'signs')

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(
        isCalifornia ? '2026 加州 DMV 交通标志图形专项' : `${state.nameZh} DMV 交通标志中文练习`,
        isCalifornia ? '加州 DMV 常见交通标志图形学习、中文识图测验和专项题库。' : stateDescription(state),
        `/${state.slug}/signs`,
      )} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '交通标志', path: `/${state.slug}/signs` }])} />
      <div className="page-shell">
        {isCalifornia ? <BackLink href="/california" label="返回加州 DMV" /> : null}
        <div className="mb-6">
          <p className="text-sm font-bold text-teal-700">Road Signs</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{isCalifornia ? '加州 DMV 交通标志图形专项' : `${state.nameZh} DMV 交通标志练习`}</h1>
          {isCalifornia ? (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              先学习常见官方交通标志，再进行识图测验；下方题库中能明确对应具体标志的题目也会直接显示相应官方图片。
            </p>
          ) : null}
        </div>

        {isCalifornia ? <CaliforniaSignsClient /> : null}

        <div className={isCalifornia ? 'mt-10' : ''}>
          {isCalifornia ? (
            <div className="mb-5">
              <p className="text-sm font-bold text-teal-700">专项题库</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">加州交通标志题库练习</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">共 {signQuestions.length} 道标志、信号和道路标线题。具体交通标志题会直接显示对应官方图片。</p>
            </div>
          ) : null}
          <QuestionsClient questions={signQuestions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} />
        </div>
      </div>
    </section>
  )
}
