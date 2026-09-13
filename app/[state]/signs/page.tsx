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
  return {
    title: `${state.nameZh} DMV 交通标志中文练习`,
    description: stateDescription(state),
    alternates: { canonical: `/${state.slug}/signs` },
  }
}

export default async function SignsPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(`${state.nameZh} DMV 交通标志中文练习`, stateDescription(state), `/${state.slug}/signs`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '交通标志', path: `/${state.slug}/signs` }])} />
      <div className="page-shell">
        {state.slug === 'california' ? <BackLink href="/california" label="返回加州 DMV" /> : null}
        <div className="mb-6">
          <p className="text-sm font-bold text-teal-700">Road Signs</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{state.nameZh} DMV 交通标志练习</h1>
        </div>
        <QuestionsClient questions={getQuestionsByCategory(state.slug, 'signs')} storageKey={`openaa-dmv:${state.slug}:wrong`} />
      </div>
    </section>
  )
}
