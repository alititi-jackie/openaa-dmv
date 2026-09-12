import Link from 'next/link'
import { ArrowRight, BookOpenCheck, FileQuestion, Globe2, ShieldCheck } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import StateSearch from '@/components/StateSearch'
import { dmvStates, popularStates } from '@/lib/dmv-data'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'
import { OPENAA_DMV_URL } from '@/lib/site'

const faq = [
  {
    question: 'OpenAA DMV 是政府官网吗？',
    answer: '不是。OpenAA DMV 是中文学习辅助和官方入口整理站，正式考试规则、费用、预约和证件要求以各州 DMV 官方网站为准。',
  },
  {
    question: '纽约州 DMV 中文题库在哪里？',
    answer: '纽约 DMV 内容优先由 OpenAA 主站承接，可以从本站纽约入口前往 https://openaa.com/dmv。',
  },
  {
    question: '错题和练习记录会上传吗？',
    answer: '第一版默认保存在当前浏览器本地，不要求登录；更换设备或清理浏览器数据后，记录可能无法保留。',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('OpenAA DMV 美国驾照中文题库', '美国各州 DMV 中文题库、Permit 笔试练习、模拟考试和官方入口。', '/')} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'OpenAA DMV', path: '/' }])} />

      <section className="bg-[#e9f2f9]">
        <div className="page-shell grid min-h-[calc(100vh-64px)] gap-8 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-md bg-white px-3 py-1 text-sm font-bold text-blue-800 ring-1 ring-blue-100">
              <Globe2 size={16} className="mr-1.5" />
              dmv.openaa.com
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 md:text-6xl">美国各州 DMV 中文题库</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
              为美国华人、新移民和留学生整理 Permit 笔试中文练习、交通标志、模拟考试和各州官方 DMV 入口。先选州，再开始练习。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#states" className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-5 py-3 text-sm font-black text-white hover:bg-blue-800">
                选择考试州
                <ArrowRight size={17} className="ml-1.5" />
              </Link>
              <a href={OPENAA_DMV_URL} className="focus-ring inline-flex items-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">
                纽约 DMV 入口
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: '州级题库', desc: '每个州独立页面、独立 SEO、独立官方入口。', icon: FileQuestion },
              { title: '模拟考试', desc: '随机抽题、提交评分、错题自动保存。', icon: BookOpenCheck },
              { title: '官方核对', desc: '每页保留州 DMV 官方手册和申请入口。', icon: ShieldCheck },
              { title: '主站引流', desc: '在自然场景中连接 OpenAA 工作、租房和资讯。', icon: Globe2 },
            ].map(({ title, desc, icon: Icon }) => (
              <div key={title} className="card p-4">
                <Icon size={26} className="text-teal-700" />
                <h2 className="mt-4 text-xl font-black text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-10 text-white">
        <div className="page-shell">
          <p className="text-sm font-bold text-cyan-200">热门入口</p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {popularStates.map((state) => {
              const href = state.status === 'external' ? state.externalUrl || OPENAA_DMV_URL : `/${state.slug}`
              return (
                <a key={state.slug} href={href} className="rounded-lg border border-white/15 bg-white/8 p-4 hover:bg-white/12">
                  <p className="text-lg font-black">{state.shortZh}</p>
                  <p className="mt-1 text-sm text-slate-300">{state.status === 'live' ? '中文题库已上线' : 'OpenAA 主站承接'}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <StateSearch states={dmvStates} />

      <section className="bg-white pb-12">
        <div className="page-shell">
          <div className="card p-5">
            <h2 className="text-2xl font-black text-slate-950">使用说明</h2>
            <div className="prose-copy mt-3 text-sm leading-7 text-slate-700">
              <p>本站中文题库用于学习辅助，帮助你先理解常见交通规则、标志和考试题型。</p>
              <p>各州 DMV 政策、费用、考试题量和预约流程可能更新。正式申请、考试和路考预约前，请务必打开对应州官方页面核对。</p>
            </div>
          </div>
        </div>
      </section>

      <OpenAACrossLinks />
    </>
  )
}
