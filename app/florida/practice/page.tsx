import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import PracticeClient from '@/components/PracticeClient'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'Florida Class E 顺序练习和随机练习', description:'佛州 Class E 中文、English 和中英对照驾照笔试练习。', alternates:{ canonical:'/florida/practice' } }
export default function FloridaPracticePage(){ return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 Class E"/><PracticeClient questions={getStateQuestions('florida')} stateSlug="florida" storageKey="openaa-dmv:florida:wrong"/></div></section> }
