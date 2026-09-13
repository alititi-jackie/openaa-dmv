import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import QuestionsClient from '@/components/QuestionsClient'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getQuestionsForState } from '@/lib/question-bank'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() {
  return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  return {
    title: state.slug === 'california' ? '2026 加州 DMV 中英文题库｜驾照笔试练习' : `${state.nameZh} DMV 题库｜中文驾照笔试练习`,
    description: stateDescription(state),
    alternates: { canonical: `/${state.slug}/questions` },
  }
}

export default async function QuestionsPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const questions = getQuestionsForState(state.slug)
  const pageTitle = `${state.nameZh} DMV 题库`

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(state.slug === 'california' ? '2026 加州 DMV 中英文题库' : pageTitle, stateDescription(state), `/${state.slug}/questions`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: 'DMV 题库', path: `/${state.slug}/questions` }])} />
      <div className="page-shell">
        {state.slug === 'california' ? <BackLink href="/california" label="返回加州 DMV" /> : null}
        <div className="mb-6">
          <p className="text-sm font-bold text-teal-700">{state.nameEn} DMV</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{pageTitle}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            当前共 {questions.length} 道练习题。可使用练习模式或学习模式；已完成英文校对的题目支持中文、English 和中英对照。
          </p>
        </div>
        <QuestionsClient questions={questions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} />
      </div>
    </section>
  )
}
