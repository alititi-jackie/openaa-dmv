import Link from 'next/link'
import { ArrowRight, BookOpenCheck, FileQuestion, Globe2, ShieldCheck } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import ShareButton from '@/components/ShareButton'
import StateSearch from '@/components/StateSearch'
import { dmvStates, popularStates } from '@/lib/dmv-data'
import { getStateQuestionCount } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'
import { OPENAA_DMV_URL } from '@/lib/site'

const faq = [
  { question: 'OpenAA DMV 是政府官网吗？', answer: '不是。OpenAA DMV 是驾照知识考试学习和官方入口整理站，正式考试规则、费用、预约和证件要求以各州 DMV 官方网站为准。' },
  { question: '题库支持哪些语言？', answer: '多数已上线州支持中文、English 和中英对照。个别州的正式考试语言有限制，州页面会单独醒目标注。' },
  { question: '纽约州 DMV 题库在哪里？', answer: '纽约州 DMV 题库已经在 OpenAA 主站上线；本站同时提供纽约 English / 中英对照学习入口。' },
  { question: '错题和练习记录会上传吗？', answer: '第一版默认保存在当前浏览器本地，不要求登录；更换设备或清理浏览器数据后，记录可能无法保留。' },
]

export default function HomePage() {
  return <>
    <JsonLd data={webPageJsonLd('美国 DMV 驾照题库｜中文 English 中英对照练习 - OpenAA DMV', '美国各州 DMV 驾照笔试题库、模拟考试和交通标志学习平台，支持中文、English 和中英对照学习。', '/')} />
    <JsonLd data={faqJsonLd(faq)} />
    <JsonLd data={breadcrumbJsonLd([{ name: 'OpenAA DMV', path: '/' }])} />
    <section className="bg-[#e9f2f9]"><div className="page-shell py-10 md:py-14"><div className="mx-auto max-w-3xl text-center"><p className="inline-flex items-center rounded-md bg-white px-3 py-1 text-sm font-bold text-blue-800 ring-1 ring-blue-100"><Globe2 size={16} className="mr-1.5" />OpenAA DMV</p><h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 md:text-6xl">美国 DMV 驾照题库</h1><p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">各州驾照笔试题库、模拟考试和交通标志练习，支持中文、English 和中英对照学习。</p><div className="mt-6 flex flex-wrap justify-center gap-3"><a href="#states" className="focus-ring inline-flex items-center rounded-md border border-blue-200 bg-blue-100 px-[23px] py-[11px] text-sm font-black text-blue-700 hover:bg-blue-200">选择考试州<ArrowRight size={17} className="ml-1.5" /></a><ShareButton title="OpenAA DMV 美国驾照题库" text="美国各州 DMV 驾照笔试题库、模拟考试和交通标志练习" className="px-6 py-3" /></div></div><div className="mx-auto mt-9 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-3">{popularStates.map((state) => { const isNewYork=state.status==='external'; const href = isNewYork ? state.externalUrl || OPENAA_DMV_URL : `/${state.slug}`; const count = state.status === 'live' ? getStateQuestionCount(state.slug) : state.questionCount; return <div key={state.slug} className="card p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300"><a href={href} className="block"><p className="text-lg font-black text-slate-950">{state.shortZh}</p><p className="mt-1 text-xs font-semibold text-slate-500">{state.status === 'live' ? `${count} 道练习题` : `${state.questionCount}+ 道练习题 · 已上线`}</p><span className="mt-3 inline-flex items-center text-sm font-bold text-blue-700">开始学习 <ArrowRight size={14} className="ml-1" /></span></a>{isNewYork?<Link href="/ny" className="focus-ring mt-3 inline-flex border-t border-slate-100 pt-2 text-xs font-bold text-slate-500 hover:text-blue-700">English / 中英练习 <ArrowRight size={12} className="ml-1" /></Link>:null}</div> })}</div></div></section>
    <StateSearch states={dmvStates.map((state) => ({ ...state, actualCount: state.status === 'live' ? getStateQuestionCount(state.slug) : state.questionCount }))} />
    <section className="bg-slate-50 py-12"><div className="page-shell"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{ title: '完整题库', desc: '按州整理道路规则、安全驾驶和交通标志练习，并提供答案解析。', icon: FileQuestion },{ title: '模拟考试', desc: '按各州规则或练习模式随机组卷、提交评分，并保存错题。', icon: BookOpenCheck },{ title: '官方信息', desc: '提供各州 DMV 官方手册、申请和路考入口方便核对。', icon: ShieldCheck },{ title: '美国生活服务', desc: '考完驾照后，可继续使用 OpenAA 找工作、租房和查看生活资讯。', icon: Globe2 }].map(({ title, desc, icon: Icon }) => <div key={title} className="card p-4"><Icon size={25} className="text-teal-700" /><h2 className="mt-4 text-lg font-black text-slate-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p></div>)}</div></div></section>
    <section className="bg-white py-12"><div className="page-shell grid gap-4 lg:grid-cols-2"><div className="card p-5"><h2 className="text-2xl font-black text-slate-950">第一次考美国驾照？</h2><div className="prose-copy mt-3 text-sm leading-7 text-slate-700"><p>先选择所在州，用完整题库理解常见交通规则和标志，再通过模拟考试检查掌握程度。</p><p>各州考试题量、证件、费用和预约政策可能调整，正式申请前请使用州页面提供的官方链接确认最新要求。</p></div></div><div className="card overflow-hidden p-0"><div className="p-5"><h2 className="text-2xl font-black text-slate-950">纽约 DMV 驾照题库</h2><p className="mt-3 text-sm leading-7 text-slate-700">纽约驾照笔试题库已在 OpenAA 主站上线，提供题库练习、模拟考试、交通标志和错题复习。</p></div><div className="grid grid-cols-2 gap-px border-t border-blue-100 bg-blue-100"><a href={OPENAA_DMV_URL} className="focus-ring inline-flex min-h-14 items-center justify-center bg-blue-50 px-3 py-3 text-center text-xs font-black text-blue-800 hover:bg-blue-100 sm:text-sm">进入中文题库<ArrowRight size={15} className="ml-1.5 shrink-0" /></a><Link href="/ny" className="focus-ring inline-flex min-h-14 items-center justify-center bg-sky-50 px-3 py-3 text-center text-xs font-black text-sky-800 hover:bg-sky-100 sm:text-sm">English / 中英练习<ArrowRight size={15} className="ml-1.5 shrink-0" /></Link></div></div></div></section>
    <OpenAACrossLinks />
  </>
}
