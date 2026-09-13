import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import PracticeClient from '@/components/PracticeClient'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateQuestions } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() {
  return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  return { title: `${state.nameZh} DMV 顺序练习和随机练习`, description: stateDescription(state), alternates: { canonical: `/${state.slug}/practice` } }
}

export default async function PracticePage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(`${state.nameZh} DMV 顺序练习`, stateDescription(state), `/${state.slug}/practice`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '练习', path: `/${state.slug}/practice` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={`返回${state.nameZh}${state.slug === 'new-jersey' ? ' MVC' : ' DMV'}`} /><PracticeClient questions={getStateQuestions(state.slug)} stateSlug={state.slug} storageKey={`openaa-dmv:${state.slug}:wrong`} /></div></section>
}
