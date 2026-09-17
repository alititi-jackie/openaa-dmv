import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import FloridaMockTestClient from '@/components/exam/FloridaMockTestClient'
import NoticeCard from '@/components/NoticeCard'
import PageStructuredData from '@/components/PageStructuredData'
import { getStateExamConfig } from '@/lib/exam/exam-config'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'2026 佛州 Class E 50题模拟考试｜Florida DMV', description:'Florida Class E Knowledge Exam 50题模拟练习；本站以80%作为学习通过线，并提供60分钟倒计时。模拟考试仅提供 English / 中英对照；目前本站尚未确认 FLHSMV 正式考试支持中文。', alternates:{ canonical:'/florida/mock-test' } }
export default function FloridaMockTestPage(){ const questions=getStateQuestions('florida'); const config=getStateExamConfig('florida'); return <><PageStructuredData title="2026 佛州 Class E 50题模拟考试" description="佛州 Class E 50题限时模拟考试，提供 English 和中英对照。" path="/florida/mock-test" stateName="佛罗里达州" statePath="/florida" pageName="模拟考试"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 FLHSMV"/><NoticeCard title="正式考试语言提醒" tone="warning" className="mb-4">目前本站尚未确认 FLHSMV Class E 正式 Knowledge Exam 支持中文。为避免误导，Florida 模拟考试只提供 English / 中英对照；中文学习请使用题库或普通练习。</NoticeCard><NoticeCard title="练习评分说明" className="mb-5">正式 Class E Knowledge Exam 为 50 题；本站采用 80%（40/50）作为学习练习线，不将该数值标注为已经由 FLHSMV 当前一手页面核实的官方及格线。60 分钟倒计时用于模拟授权第三方在线考试节奏。</NoticeCard><FloridaMockTestClient questions={questions} config={config}/></div></section></> }
