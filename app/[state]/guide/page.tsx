import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { breadcrumbJsonLd, faqJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() {
  return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  return {
    title: `${state.nameZh} DMV 驾照考试指南`,
    description: stateDescription(state),
    alternates: { canonical: `/${state.slug}/guide` },
  }
}

export default async function GuidePage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const faq = [
    {
      question: `${state.nameZh} DMV 考试前应该先看什么？`,
      answer: `建议先阅读本站中文说明建立框架，再打开 ${state.officialName} 官方 Driver Manual 核对最新规则。`,
    },
    {
      question: '是否需要背完所有题？',
      answer: '不建议只背答案。应该理解路权、标志、安全距离、酒驾和特殊区域规则。',
    },
  ]

  return (
    <>
      <JsonLd data={webPageJsonLd(`${state.nameZh} DMV 驾照考试指南`, stateDescription(state), `/${state.slug}/guide`)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '考试指南', path: `/${state.slug}/guide` }])} />
      <section className="bg-white py-12">
        <div className="page-shell grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <article className="prose-copy">
            <p className="text-sm font-bold text-teal-700">{state.nameEn} Driver Guide</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">{state.nameZh} DMV 驾照考试指南</h1>
            <div className="mt-6 text-base leading-8 text-slate-700">
              <p>{state.nameZh} 的驾照考试准备，最重要的是把中文理解和官方规则结合起来。中文题库可以帮你快速掌握常见题型，但正式申请和考试安排必须以官方页面为准。</p>
              <p>建议先从道路规则、交通标志和安全驾驶三类题开始。等正确率稳定后，再做模拟考试，并把错题集中复习。考试前一天不要只刷题，也要重新检查证件、预约时间、考试地点和费用。</p>
              <p>刚搬到美国或换州生活时，驾照只是安顿生活的一部分。找工作、找房、买车、二手交易和生活资讯可以回到 OpenAA 主站继续完成。</p>
            </div>
            <div className="mt-8 grid gap-3">
              {state.guide.map((item, index) => (
                <div key={item} className="card p-4">
                  <p className="text-sm font-black text-blue-700">步骤 {index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </article>
          <aside className="grid content-start gap-4">
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">学习入口</h2>
              <div className="mt-4 grid gap-2">
                <Link href={`/${state.slug}/questions`} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">中文题库</Link>
                <Link href={`/${state.slug}/practice`} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">顺序 / 随机练习</Link>
                <Link href={`/${state.slug}/mock-test`} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">模拟考试</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">官方入口</h2>
              <div className="mt-4 grid gap-2 text-sm font-bold text-blue-800">
                <a href={state.driverManualUrl}>官方 Driver Manual</a>
                <a href={state.permitUrl}>Permit / License 申请</a>
                <a href={state.roadTestUrl}>Road Test / Drive Test</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <OpenAACrossLinks />
    </>
  )
}
