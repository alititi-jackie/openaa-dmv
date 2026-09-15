import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import ExamTimer from '@/components/exam/ExamTimer'
import FloridaMockTestClient from '@/components/exam/FloridaMockTestClient'
import { getStateExamConfig } from '@/lib/exam/exam-config'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'2026 佛州 Class E 50题模拟考试｜Florida DMV', description:'Florida Class E Knowledge Exam 50题模拟练习；本站以80%作为学习通过线，并提供60分钟倒计时。模拟考试仅提供 English / 中英对照；目前本站尚未确认 FLHSMV 正式考试支持中文。', alternates:{ canonical:'/florida/mock-test' } }
export default function FloridaMockTestPage(){ const questions=getStateQuestions('florida'); const config=getStateExamConfig('florida'); return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 Class E"/><div className="mb-5 rounded-lg border-2 border-amber-300 bg-amber-50 p-4"><p className="font-black text-amber-900">正式考试语言提醒</p><p className="mt-1 text-sm leading-6 text-amber-900">目前本站尚未确认 FLHSMV Class E 正式 Knowledge Exam 支持中文。为避免误导，Florida 模拟考试只提供 English / 中英对照；中文学习请使用题库或普通练习。</p></div><div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4"><p className="font-black text-blue-950">练习评分说明</p><p className="mt-1 text-sm leading-6 text-blue-900">正式 Class E Knowledge Exam 为 50 题；本站采用 80%（40/50）作为学习练习线，不将该数值标注为已经由 FLHSMV 当前一手页面核实的官方及格线。60 分钟倒计时用于模拟授权第三方在线考试节奏。</p></div><ExamTimer minutes={60}/><FloridaMockTestClient questions={questions} config={config}/></div></section> }
