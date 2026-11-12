import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import QuestionsClient from '@/components/QuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStatePageConfig } from '@/lib/state-page-config'
import { getStateQuestions } from '@/lib/state-question-bank'
import { stateAgencyLabel, stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'
import StatePracticeLinks from '@/components/StatePracticeLinks'

type Props = { params: Promise<{ state: string }> }
export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  const config = getStatePageConfig(state).questions!
  return { title: config.title, description: config.description, alternates: { canonical: `/${state.slug}/questions` } }
}
export default async function QuestionsPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const questions = getStateQuestions(state.slug)
  const config = getStatePageConfig(state).questions!
  const pageTitle = `${stateAgencyLabel(state)} 驾照题库`
  const headerDescription = config.headerDescription?.(questions.length) ?? `当前共 ${questions.length} 道练习题。可使用练习模式或学习模式；已完成英文校对的题目支持中文、English 和中英对照。`
  return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(config.structuredTitle ?? pageTitle, config.structuredDescription ?? stateDescription(state), `/${state.slug}/questions`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '驾照题库', path: `/${state.slug}/questions` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={config.backLabel ?? stateBackLabel(state)} /><StudyPageHeader eyebrow={config.eyebrow ?? `${state.nameEn} · ${state.officialName}`} title={config.heading ?? pageTitle} description={headerDescription} />{state.slug === 'pennsylvania' ? (
        <div className="mb-6 rounded-2xl border border-[#dbe4f0] bg-white p-5">
          <p className="text-sm leading-6 text-[#40506b]">本站宾州题库题目来源：PennDOT 官方驾驶手册 <strong>PUB 95（4-21）</strong>第 2、3、4 章章末复习题，共 184 题。题目、选项与正确答案均为官方原文，标志题配手册原图，解析由本站依据手册正文编写。</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href="https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bdl/bdl-manuals/pa-drivers-manual-non-commercial/chinese/pub%2095c.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8' }} className="rounded-full border border-[#1d4ed8] bg-white px-4 py-2 text-sm font-semibold">下载官方中文手册 PDF（含复习题）</a>
            <a href="https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bdl/bdl-manuals/pa-drivers-manual-non-commercial/english/pub%2095.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8' }} className="rounded-full border border-[#1d4ed8] bg-white px-4 py-2 text-sm font-semibold">Download English Manual (PUB 95)</a>
          </div>
          <p className="mt-2 text-xs text-[#7a879c]">两个链接均直达宾州政府官网 pa.gov 官方文件。</p>
        </div>
      ) : null}<QuestionsClient questions={questions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} /><StatePracticeLinks basePath={`/${state.slug}`} current="questions" embedded /></div></section>
}
