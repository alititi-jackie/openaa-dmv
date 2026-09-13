import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import QuestionsClient from '@/components/QuestionsClient'
import { getQuestionSignMeta } from '@/components/QuestionSignImage'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateQuestionsByCategory } from '@/lib/state-question-bank'
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
    description: isCalifornia ? '加州 DMV 交通标志专项题库，支持中文、English 和中英对照。' : stateDescription(state),
    alternates: { canonical: `/${state.slug}/signs` },
  }
}

export default async function SignsPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const isCalifornia = state.slug === 'california'
  const allSignQuestions = getStateQuestionsByCategory(state.slug, 'signs')
  const illustrated = allSignQuestions.filter((question) => getQuestionSignMeta(question) !== null)
  const signQuestions = isCalifornia ? illustrated.filter((question) => /^ca2-signs-(?:00[1-9]|01\d|020)$/.test(question.id)) : illustrated

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(isCalifornia ? '2026 加州 DMV 交通标志题库' : `${state.nameZh} DMV 交通标志练习`, isCalifornia ? '加州 DMV 交通标志、信号和道路标线中英文专项题库。' : stateDescription(state), `/${state.slug}/signs`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '交通标志', path: `/${state.slug}/signs` }])} />
      <div className="page-shell">
        <BackLink href={`/${state.slug}`} label={`返回${state.nameZh} DMV`} />
        <div className="mb-6">
          <p className="text-sm font-bold text-teal-700">Road Signs</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{isCalifornia ? '加州 DMV 交通标志题库' : `${state.nameZh} DMV 交通标志练习`}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">共 {signQuestions.length} 道已配正确对应图片的交通标志识图题。交通标志专项不再显示无图题。</p>
        </div>
        <QuestionsClient questions={signQuestions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} />
      </div>
    </section>
  )
}
