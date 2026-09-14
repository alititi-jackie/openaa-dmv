import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import QuestionsClient from '@/components/QuestionsClient'
import { getQuestionSignMeta } from '@/lib/sign-visuals'
import { getStateQuestionsByCategory } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'Florida Class E 交通标志练习', description:'佛州 Class E 交通标志、信号和道路标线练习。', alternates:{ canonical:'/florida/signs' } }
export default function FloridaSignsPage(){ const questions=getStateQuestionsByCategory('florida','signs').filter((q)=>getQuestionSignMeta(q)!==null); return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 Class E"/><div className="mb-6"><p className="text-sm font-bold text-teal-700">Road Signs</p><h1 className="mt-2 text-3xl font-black">Florida Class E 交通标志练习</h1><p className="mt-3 text-sm text-slate-600">共 {questions.length} 道已配图片的交通标志题。</p></div><QuestionsClient questions={questions} storageKey="openaa-dmv:florida:wrong" stateSlug="florida"/></div></section> }
