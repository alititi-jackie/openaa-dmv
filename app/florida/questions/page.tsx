import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import QuestionsClient from '@/components/QuestionsClient'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'2026 佛州 Class E 中文题库｜Florida 驾照笔试练习', description:'Florida Class E 中文、English 和中英对照题库，覆盖佛州道路规则、Learner License、校车、限速、安全驾驶和交通标志。', alternates:{ canonical:'/florida/questions' } }
export default function FloridaQuestionsPage(){ const questions=getStateQuestions('florida'); return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 Class E"/><div className="mb-6"><p className="text-sm font-bold text-teal-700">Florida · FLHSMV</p><h1 className="mt-2 text-3xl font-black">Florida Class E 驾照题库</h1><p className="mt-3 text-sm leading-6 text-slate-600">当前共 {questions.length} 道练习题，支持中文、English 和中英对照。</p></div><QuestionsClient questions={questions} storageKey="openaa-dmv:florida:wrong" stateSlug="florida"/></div></section> }
