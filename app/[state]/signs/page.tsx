import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import QuestionsClient from '@/components/QuestionsClient'
import { getQuestionSignMeta } from '@/components/QuestionSignImage'
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

  // A visual sign test must actually be visual. Never show a sign-category question
  // here unless it has a verified matching image. This prevents text-only cards from
  // appearing in the traffic-sign practice while the illustrated bank is expanded.
  const illustrated = allSignQuestions.filter((question) => getQuestionSignMeta(question) !== null)
  const signQuestions = isCalifornia
    ? illustrated.filter((question) => /^ca2-signs-(?:00[1-9]|01\d|020)$/.test(question.id))
    : illustrated

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(isCalifornia ? '2026 加州 DMV 交通标志题库' : `${state.nameZh} DMV 交通标志练习`, isCalifornia ? '加州 DMV 交通标志、信号和道路标线中英文专项题库。' : stateDescription(state), `/${state.slug}/signs`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '交通标志', path: `/${state.slug}/signs` }])} />
      <div className="page-shell">
        <BackLink href={`/${state.slug}`} label={`返回${state.nameZh} DMV`} />
        <div className="mb-6">
          <p className="text-sm font-bold text-teal-700">Road Signs</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{isCalifornia ? '加州 DMV 交通标志题库' : `${state.nameZh} DMV 交通标志练习`}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            {isCalifornia
              ? `共 ${signQuestions.length} 道去重后的交通标志、铁路、路缘和道路标线识图题。每一道题都配有对应图片，支持中文、English 和中英对照。`
              : `共 ${signQuestions.length} 道已配图的交通标志识图题。这里只显示有对应标志图片的题目，支持中文、English 和中英对照。`}
          </p>
        </div>
        <QuestionsClient questions={signQuestions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} />
      </div>
    </section>
  )
}
