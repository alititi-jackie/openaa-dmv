import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import WrongQuestionsClient from '@/components/WrongQuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import PageStructuredData from '@/components/PageStructuredData'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'Florida Class E 错题本', description:'佛州 Class E 驾照笔试错题复习。', alternates:{ canonical:'/florida/wrong-questions' } }
export default function FloridaWrongPage(){ return <><PageStructuredData title="佛州 FLHSMV 错题本" description="集中复习佛州 Class E 练习和模拟考试中的错题。" path="/florida/wrong-questions" stateName="佛罗里达州" statePath="/florida" pageName="错题本"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 FLHSMV"/><StudyPageHeader eyebrow="Wrong Questions" title="佛州 FLHSMV 错题本" description="练习和模拟考试中的错题会保存在当前浏览器，可在这里集中复习。"/><WrongQuestionsClient questions={getStateQuestions('florida')} stateSlug="florida" storageKey="openaa-dmv:florida:wrong"/></div></section></> }
