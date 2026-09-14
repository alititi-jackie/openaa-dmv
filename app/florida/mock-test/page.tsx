import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import ExamTimer from '@/components/exam/ExamTimer'
import MockTestClient from '@/components/exam/MockTestClient'
import { getStateExamConfig } from '@/lib/exam/exam-config'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'2026 佛州 Class E 50题模拟考试｜Florida DMV', description:'Florida Class E Knowledge Exam 50题模拟考试，按80%通过线评分，并提供60分钟在线考试倒计时。', alternates:{ canonical:'/florida/mock-test' } }
export default function FloridaMockTestPage(){ const questions=getStateQuestions('florida'); const config=getStateExamConfig('florida'); return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 Class E"/><ExamTimer minutes={60}/><MockTestClient questions={questions} stateSlug="florida" config={config}/></div></section> }
