import type { Metadata } from 'next'
import FloridaRules from '@/components/FloridaRules'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import StateGuideLayout from '@/components/StateGuideLayout'
import { getStateBySlug } from '@/lib/dmv-data'
import { getStateQuestionCount } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = { title:'2026 佛州 Class E 驾照笔试指南｜50题模拟考试', description:'Florida Class E Knowledge Exam 学习指南：完整题库、50题模拟考试、Learner License、校车、限速、停车、自行车和交通标志。', alternates:{ canonical:'/florida/guide' } }
export default function FloridaGuidePage(){ const count=getStateQuestionCount('florida'); const state=getStateBySlug('florida')!; const steps=['先阅读 Florida Driver License Handbook，建立 Class E 规则框架。','先用中文题库理解 Florida 专属规则，再切换 English / 中英对照熟悉考试词汇。','重点掌握 school zone、标准限速、school bus、停车距离、Learner 时间限制、50小时监督驾驶、DUI、自行车和铁路道口。','完成 50 题模拟考试；模拟考试默认 English，只提供 English / 中英对照。','把错题集中到错题本反复练习，正式考试前再次核对 FLHSMV 当前规则和考试语言。']; const intro=<><p>Florida Class E Knowledge Exam 共 50 道选择题，覆盖交通法规、安全驾驶和交通控制识别。FLHSMV 授权第三方在线考试要求 60 分钟时限。</p><p>本站当前提供 {count} 道 Florida 专属题、补充题与公共核心练习题。50题只是每次模拟考试题量，不是总题库数量。</p></>; const notice=<div className="mb-6 rounded-lg border-2 border-amber-300 bg-amber-50 p-4"><p className="font-black text-amber-900">考试语言说明</p><p className="mt-1 text-sm leading-6 text-amber-900">目前本站尚未确认 FLHSMV Class E 正式 Knowledge Exam 支持中文。中文题库用于学习辅助；50题模拟考试仅提供 English / 中英对照。</p></div>; return <><JsonLd data={webPageJsonLd('2026 佛州 Class E 驾照笔试指南', 'Florida Class E Knowledge Exam 学习指南、50题模拟考试和高频规则。', '/florida/guide')}/><JsonLd data={breadcrumbJsonLd([{name:'首页',path:'/'},{name:'佛罗里达州',path:'/florida'},{name:'考试指南',path:'/florida/guide'}])}/><StateGuideLayout state={state} backLabel="返回佛州 FLHSMV" eyebrow="Florida Class E Driver Guide" title="2026 佛州 Class E 驾照笔试指南" intro={intro} steps={steps} questionCount={count} examLabel="50 题模拟考试" notice={notice}/><FloridaRules/><OpenAACrossLinks/></> }
