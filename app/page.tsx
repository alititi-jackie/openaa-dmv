import Link from 'next/link'
import { ArrowRight, BookOpenCheck, FileQuestion, Globe2, ShieldCheck } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import StateSearch from '@/components/StateSearch'
import { dmvStates, popularStates } from '@/lib/dmv-data'
import { getQuestionCountForState } from '@/lib/question-bank'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'
import { OPENAA_DMV_URL } from '@/lib/site'

const faq = [
  {
    question: 'OpenAA DMV 是政府官网吗？',
    answer: '不是。OpenAA DMV 是中文学习辅助和官方入口整理站，正式考试规则、费用、预约和证件要求以各州 DMV 官方网站为准。',
  },
  {
    question: '纽约州 DMV 中文题库在哪里？',
    answer: '纽约州 DMV 中文题库已经在 OpenAA 主站上线，可从本站纽约入口直接进入。',
  },
  {
    question: '错题和练习记录会上传吗？',
    answer: '第一版默认保存在当前浏览器本地，不要求登录；更换设备或清理浏览器数据后，记录可能无法保留。',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('美国 DMV 中文题库｜各州驾照笔试练习 - OpenAA DMV', '美国各州 DMV 中文题库、Permit 驾照笔试练习、模拟考试、交通标志和官方 DMV 入口。选择所在州即可开始刷题。', '/')} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'OpenAA DMV', path: '/' }])} />

      <section className="bg-[#e9f2f9]">
        <div className="page-shell py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-md bg-white px-3 py-1 text-sm font-bold text-blue-800 ring-1 ring-blue-100">
              <Globe2 size={16} className="mr-1.5" />
              OpenAA DMV
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 md:text-6xl">美国 DMV 中文题库</h1>
            <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">
              选择你所在的州，开始中文 Permit 驾照笔试练习、模拟考试和交通标志学习。
            </p>
            <a href="#states" className="focus-ring mt-6 inline-flex items-center rounded-md bg-blue-700 px-6 py-3 text-sm font-black text-white hover:bg-blue-800">
              选择考试州
              <ArrowRight size={17} className="ml-1.5" />
            </a>
          </div>

          <div className="mx-auto mt-9 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-3">
            {popularStates.map((state) => {
              const href = state.status === 'external' ? state.externalUrl || OPENAA_DMV_URL : `/${state.slug}`
              const count = state.status === 'live' ? getQuestionCountForState(state.slug) : state.questionCount
              return (
                <a key={state.slug} href={href} className="card p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300">
                  <p className="text-lg font-black text-slate-950">{state.shortZh}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {state.status === 'live' ? `${count} 道中文练习题` : '150+ 道中文题 · 已上线'}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-bold text-blue-700">
                    开始刷题 <ArrowRight size={14} className="ml-1" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <StateSearch states={dmvStates} />

      <section className="bg-slate-50 py-12">
        <div className="page-shell">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: '中文题库', desc: '按州整理常见道路规则、安全驾驶和交通标志练习。', icon: FileQuestion },
              { title: '模拟考试', desc: '随机抽题、提交评分，并保存错题方便反复复习。', icon: BookOpenCheck },
              { title: '官方信息', desc: '提供各州 DMV 官方手册、申请和路考入口方便核对。', icon: ShieldCheck },
              { title: '美国生活服务', desc: '考完驾照后，可继续使用 OpenAA 找工作、租房和查看生活资讯。', icon: Globe2 },
            ].map(({ title, desc, icon: Icon }) => (
              <div key={title} className="card p-4">
                <Icon size={25} className="text-teal-700" />
                <h2 className="mt-4 text-lg font-black text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-shell grid gap-4 lg:grid-cols-2">
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">第一次考美国驾照？</h2>
            <div className="prose-copy mt-3 text-sm leading-7 text-slate-700">
              <p>先选择所在州，用中文题库理解常见交通规则和标志，再通过模拟考试检查掌握程度。</p>
              <p>各州考试题量、证件、费用和预约政策可能调整，正式申请前请使用州页面提供的 DMV 官方链接确认最新要求。</p>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">纽约州 DMV 中文题库</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">纽约州题库已经在 OpenAA 主站上线，包含中文练习、模拟考试、交通标志和错题复习。</p>
            <a href={OPENAA_DMV_URL} className="focus-ring mt-5 inline-flex items-center rounded-md bg-blue-700 px-5 py-3 text-sm font-black text-white hover:bg-blue-800">
              进入纽约 DMV 中文题库
              <ArrowRight size={16} className="ml-1.5" />
            </a>
          </div>
        </div>
      </section>

      <OpenAACrossLinks />
    </>
  )
}
