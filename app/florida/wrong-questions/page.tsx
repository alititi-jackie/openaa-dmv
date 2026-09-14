import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import WrongQuestionsClient from '@/components/WrongQuestionsClient'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'Florida Class E 错题本', description:'佛州 Class E 驾照笔试错题复习。', alternates:{ canonical:'/florida/wrong-questions' } }
export default function FloridaWrongPage(){ return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 Class E"/><div className="mb-6"><p className="text-sm font-bold text-teal-700">Wrong Questions</p><h1 className="mt-2 text-3xl font-black">Florida Class E 错题本</h1></div><WrongQuestionsClient questions={getStateQuestions('florida')} stateSlug="florida" storageKey="openaa-dmv:florida:wrong"/></div></section> }
