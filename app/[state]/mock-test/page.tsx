import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import MockTestClient from '@/components/MockTestClient'
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
    title: `${state.nameZh} DMV 中文模拟考试`,
    description: stateDescription(state),
    alternates: { canonical: `/${state.slug}/mock-test` },
  }
}

export default async function MockTestPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(`${state.nameZh} DMV 中文模拟考试`, stateDescription(state), `/${state.slug}/mock-test`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '模拟考试', path: `/${state.slug}/mock-test` }])} />
      <div className="page-shell">
        <MockTestClient questions={getQuestionsForState(state.slug)} stateSlug={state.slug} storageKey={`openaa-dmv:${state.slug}:wrong`} />
      </div>
    </section>
  )
}
