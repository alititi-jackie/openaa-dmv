import Link from 'next/link'
import BackLink from './BackLink'
import ExternalLinkAnchor from './ExternalLinkAnchor'
import type { DmvState } from '@/lib/dmv-data'
import { TOOLKU_DMV_CHECKER_URL } from '@/lib/site'

type Props = {
  state: DmvState
  basePath?: string
  backLabel: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  steps: string[]
  questionCount: number
  examLabel: string
  notice?: React.ReactNode
  extraAside?: React.ReactNode
}

export default function StateGuideLayout({ state, basePath = `/${state.slug}`, backLabel, eyebrow, title, intro, steps, questionCount, examLabel, notice, extraAside }: Props) {
  return (
    <section className="bg-white py-12">
      <div className="page-shell">
        <BackLink href={basePath} label={backLabel} />
        {notice}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <article className="prose-copy">
            <p className="text-sm font-bold text-teal-700">{eyebrow}</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">{title}</h1>
            <div className="mt-6 text-base leading-8 text-slate-700">{intro}</div>
            <div className="mt-8 grid gap-3">
              {steps.map((item, index) => (
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
                <Link href={`${basePath}/questions`} className="focus-ring rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200">完整题库（{questionCount} 题）</Link>
                <Link href={`${basePath}/practice`} className="focus-ring rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200">随机 / 顺序练习</Link>
                <Link href={`${basePath}/mock-test`} className="focus-ring rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200">{examLabel}</Link>
                <Link href={`${basePath}/signs`} className="focus-ring rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200">交通标志</Link>
                <Link href={`${basePath}/wrong-questions`} className="focus-ring rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200">错题本</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">官方入口</h2>
              <div className="mt-4 grid gap-2 text-sm font-bold text-blue-800">
                <ExternalLinkAnchor href={state.driverManualUrl} className="justify-between px-1 py-1">官方 Driver Manual</ExternalLinkAnchor>
                <ExternalLinkAnchor href={state.permitUrl} className="justify-between px-1 py-1">Permit / License 申请</ExternalLinkAnchor>
                <ExternalLinkAnchor href={state.roadTestUrl} className="justify-between px-1 py-1">Road Test / Drive Test</ExternalLinkAnchor>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="text-xl font-black text-slate-950">申请资料工具</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">准备申请驾照前，可使用 Toolku 检查常见证件和资料，正式要求仍以本州 DMV 为准。</p>
              <ExternalLinkAnchor href={TOOLKU_DMV_CHECKER_URL} className="mt-4 border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-bold text-teal-800 hover:bg-teal-100">检查 DMV 申请资料</ExternalLinkAnchor>
            </div>
            {extraAside}
          </aside>
        </div>
      </div>
    </section>
  )
}
