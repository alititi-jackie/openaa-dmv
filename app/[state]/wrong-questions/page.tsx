import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import WrongQuestionsClient from '@/components/WrongQuestionsClient'
import { dmvStates, getLiveStateBySlug, getQuestionsForState } from '@/lib/dmv-data'
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
    title: `${state.nameZh} DMV 错题本`,
    description: stateDescription(state),
    alternates: { canonical: `/${state.slug}/wrong-questions` },
  }
}

export default async function WrongQuestionsPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(`${state.nameZh} DMV 错题本`, stateDescription(state), `/${state.slug}/wrong-questions`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '错题本', path: `/${state.slug}/wrong-questions` }])} />
      <div className="page-shell">
        <div className="mb-6">
          <p className="text-sm font-bold text-teal-700">Wrong Questions</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{state.nameZh} DMV 错题本</h1>
        </div>
        <WrongQuestionsClient questions={getQuestionsForState(state.slug)} stateSlug={state.slug} storageKey={`openaa-dmv:${state.slug}:wrong`} />
      </div>
    </section>
  )
}
