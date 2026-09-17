import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import StateGuideLayout from '@/components/StateGuideLayout'
import { getStateBySlug } from '@/lib/dmv-data'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo'
export const metadata:Metadata={title:'2026 纽约 DMV Permit 笔试指南｜20题14题通过',description:'New York DMV Class D/DJ/E learner permit 笔试学习指南：20题、14题通过、4道交通标志题至少答对2道，重点学习 Driver Manual 第4至11章和 Road Signs。',alternates:{canonical:'/ny/guide'}}
export default function NewYorkGuidePage(){const count=getNewYorkQuestions().length;const state=getStateBySlug('new-york')!;const steps=['阅读 New York DMV Driver Manual 第 4 至 11 章和 Road Signs。','使用纽约独立题库理解路权、交通标志和安全驾驶规则。','先做随机练习，再进行 20 题模拟考试。','同时满足总题至少答对 14 题、4 道标志题至少答对 2 题。','集中复习错题，正式考试前再次核对 NY DMV 最新要求。'];const intro=<><p>Class D/DJ/E learner permit 笔试共20题，至少答对14题；4道交通标志题中至少答对2道。</p><p>NY DMV 官方明确指出，第4至11章及 Road Signs 是书面考试需要掌握的范围。本站使用纽约独立题库，共 {count} 道练习题，不混入其它州公共题库。</p></>;return <><JsonLd data={webPageJsonLd('2026 纽约 DMV 驾照笔试指南', 'New York DMV Permit 笔试指南：20题、14题通过、4道交通标志题至少答对2道。', '/ny/guide')}/><JsonLd data={breadcrumbJsonLd([{name:'首页',path:'/'},{name:'纽约州',path:'/ny'},{name:'考试指南',path:'/ny/guide'}])}/><StateGuideLayout state={state} basePath="/ny" backLabel="返回纽约 DMV" eyebrow="New York DMV Permit Guide" title="2026 纽约 DMV 驾照笔试指南" intro={intro} steps={steps} questionCount={count} examLabel="20 题模拟考试"/><OpenAACrossLinks/></>}
