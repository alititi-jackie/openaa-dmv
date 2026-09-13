import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import { AlertTriangle, BookOpenCheck, BriefcaseBusiness, ClipboardList, FileQuestion, Home, Newspaper, ShieldCheck, ShoppingBag, Signpost, TrafficCone } from 'lucide-react'
import { OPENAA_DMV_URL } from './site'

export type StateStatus = 'live' | 'external' | 'coming-soon'
export type DmvState = { slug:string; code:string; nameEn:string; nameZh:string; shortZh:string; status:StateStatus; questionCount:number; examRule:string; passRule:string; officialName:string; officialUrl:string; driverManualUrl:string; permitUrl:string; roadTestUrl:string; externalUrl?:string; popular?:boolean; summary:string; guide:string[] }
export type DmvQuestion = { id:string; category:'rules'|'signs'|'safety'|'documents'; question:string; choices:string[]; answerIndex:number; explanation:string }
export type ToolLink = { title:string; description:string; href:string; icon:ComponentType<LucideProps> }

export const dmvStates: DmvState[] = [
{ slug:'new-york', code:'NY', nameEn:'New York', nameZh:'纽约州', shortZh:'纽约', status:'external', questionCount:150, examRule:'纽约 DMV Permit 笔试通常为 20 题。', passRule:'至少答对 14 题，并满足交通标志题要求。', officialName:'New York DMV', officialUrl:'https://dmv.ny.gov/', driverManualUrl:'https://dmv.ny.gov/driver-license/drivers-manual-practice-tests', permitUrl:'https://dmv.ny.gov/driver-license/get-learner-permit', roadTestUrl:'https://dmv.ny.gov/driver-license/schedule-and-take-road-test', externalUrl:OPENAA_DMV_URL, popular:true, summary:'纽约 DMV 中文题库已在 OpenAA 主站承接，当前站点负责其他州扩展。', guide:['确认身份、年龄和居住地址材料。','阅读纽约官方 Driver Manual。','完成 Permit 笔试后再准备路考预约。'] },
{ slug:'california', code:'CA', nameEn:'California', nameZh:'加利福尼亚州', shortZh:'加州', status:'live', questionCount:180, examRule:'California DMV 当前公布的知识考试通过标准为 80%。', passRule:'本站提供 36 题标准模拟和 46 题青少年强化模拟；实际考试题量、申请类型和考试安排请以 California DMV 当次规定为准。', officialName:'California DMV', officialUrl:'https://www.dmv.ca.gov/', driverManualUrl:'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/', permitUrl:'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/instruction-permits/', roadTestUrl:'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/drive-test/', popular:true, summary:'适合准备加州 Permit 笔试的新移民、留学生和第一次申请驾照用户。', guide:['先阅读 California Driver Handbook，重点看路权、限速、酒驾和行人规则。','准备身份证明、居住地址和申请材料。','完成笔试后，根据 permit 限制和年龄要求安排练车与路考。'] },
{ slug:'new-jersey', code:'NJ', nameEn:'New Jersey', nameZh:'新泽西州', shortZh:'新泽西', status:'live', questionCount:175, examRule:'New Jersey MVC 普通知识考试为 50 题，另有器官捐赠调查题。', passRule:'50 题中至少答对 40 题（80%）通过；知识考试失败后可在 7 天后重考。', officialName:'New Jersey MVC', officialUrl:'https://www.nj.gov/mvc/', driverManualUrl:'https://www.nj.gov/mvc/about/manuals.htm', permitUrl:'https://www.nj.gov/mvc/license/firstlic.htm', roadTestUrl:'https://www.nj.gov/mvc/license/roadtest.htm', popular:true, summary:'面向新泽西首次驾照和知识考试用户，提供 NJ 专属考点、公共核心题与 50 题模拟考试。', guide:['准备满足 6 Point ID Verification 的材料并取得 permit。','参加知识考试和视力测试；正式知识考试为 50 题，至少答对 40 题。','知识考试失败后可在 7 天后重考。','通过后按年龄要求完成监督驾驶；未满21岁通常至少6个月，21岁及以上 GDL 通常至少3个月。','参加 road test；失败后至少等待14天重考。','通过路考后取得 Probationary Driver’s License，并按规定完成后续升级。'] },
{ slug:'pennsylvania', code:'PA', nameEn:'Pennsylvania', nameZh:'宾夕法尼亚州', shortZh:'宾州', status:'live', questionCount:28, examRule:'宾州 PennDOT 笔试覆盖交通规则、标志、酒驾和安全驾驶。', passRule:'以官方 Driver Manual 为最终依据，模拟考试稳定通过后再预约。', officialName:'PennDOT Driver and Vehicle Services', officialUrl:'https://www.dmv.pa.gov/', driverManualUrl:'https://www.pa.gov/agencies/dmv/resources/driver-and-vehicle-services-driver-services/pa-driver-s-manual.html', permitUrl:'https://www.pa.gov/agencies/dmv/driver-services/driver-licensing.html', roadTestUrl:'https://www.pa.gov/agencies/dmv/driver-services/driver-and-vehicle-services-driver-services-schedule-a-road-test.html', popular:true, summary:'宾州 DMV 中文练习，适合费城、匹兹堡及周边中文用户。', guide:['先用中文题库建立规则框架，再阅读 PennDOT 官方手册。','重点复习校车、行人、恶劣天气和高速并线。','预约前确认考试中心要求和 Real ID/身份证明材料。'] },
{ slug:'massachusetts', code:'MA', nameEn:'Massachusetts', nameZh:'马萨诸塞州', shortZh:'麻州', status:'live', questionCount:28, examRule:'麻州 RMV learner permit 考试注重安全规则、交通标志和违规处罚。', passRule:'把高频规则和标志题刷熟，再查看 RMV 最新考试说明。', officialName:'Massachusetts RMV', officialUrl:'https://www.mass.gov/orgs/massachusetts-registry-of-motor-vehicles', driverManualUrl:'https://www.mass.gov/lists/drivers-manuals', permitUrl:'https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit', roadTestUrl:'https://www.mass.gov/how-to/schedule-your-road-test', popular:true, summary:'面向波士顿及麻州中文用户的 RMV Permit 学习入口。', guide:['确认 learner permit 的年龄、身份证明和预约要求。','复习城市道路、环岛、行人和雪天驾驶规则。','路考前查看 RMV 车辆、陪同人和预约规则。'] },
{ slug:'washington', code:'WA', nameEn:'Washington', nameZh:'华盛顿州', shortZh:'华州', status:'live', questionCount:28, examRule:'华盛顿州 DOL 知识考试覆盖交通法规、标志和驾驶安全。', passRule:'中文练习用于学习辅助，考试前以 Washington DOL 官方信息为准。', officialName:'Washington DOL', officialUrl:'https://dol.wa.gov/', driverManualUrl:'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides', permitUrl:'https://dol.wa.gov/driver-licenses-and-permits/learner-permit', roadTestUrl:'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing', summary:'服务西雅图、贝尔维尤及华州中文用户的驾照学习入口。', guide:['先确认 permit 与 knowledge test 要求。','重点复习雨天驾驶、行人、自行车和山区道路安全。','考试前查看 DOL 最新预约与测试政策。'] },
{ slug:'texas', code:'TX', nameEn:'Texas', nameZh:'得克萨斯州', shortZh:'德州', status:'live', questionCount:28, examRule:'Texas DPS 知识考试覆盖道路规则、标志和安全驾驶。', passRule:'练习用于辅助理解，正式考试要求以 Texas DPS 为准。', officialName:'Texas DPS', officialUrl:'https://www.dps.texas.gov/section/driver-license', driverManualUrl:'https://www.dps.texas.gov/internetforms/Forms/DL-7.pdf', permitUrl:'https://www.dps.texas.gov/section/driver-license/how-apply-texas-driver-license', roadTestUrl:'https://www.dps.texas.gov/section/driver-license/schedule-your-driving-test-appointment', summary:'面向休斯顿、达拉斯、奥斯汀等地区中文用户的驾照学习入口。', guide:['阅读 Texas Driver Handbook。','复习道路规则、标志和安全驾驶。','申请前核对 DPS 最新材料和预约要求。'] },
]

export const popularStates = dmvStates.filter((state) => state.popular)
export function getStateBySlug(slug:string) { return dmvStates.find((state) => state.slug === slug) }
export function getLiveStateBySlug(slug:string) { const state=getStateBySlug(slug); return state?.status === 'live' ? state : undefined }
export const categoryLabels: Record<DmvQuestion['category'], string> = { rules:'道路规则', signs:'交通标志', safety:'安全驾驶', documents:'证件与流程' }
export function shuffleQuestions<T>(items:T[], seed=Date.now()) { const list=[...items]; let value=seed; for(let i=list.length-1;i>0;i--){ value=(value*9301+49297)%233280; const j=Math.floor((value/233280)*(i+1)); [list[i],list[j]]=[list[j],list[i]] } return list }
export const dmvTools: ToolLink[] = [
{ title:'中文题库', description:'按分类练习 DMV 知识题。', href:'questions', icon:FileQuestion },
{ title:'顺序练习', description:'逐题练习并保存学习进度。', href:'practice', icon:BookOpenCheck },
{ title:'模拟考试', description:'随机组卷，模拟正式知识考试。', href:'mock-test', icon:ClipboardList },
{ title:'交通标志', description:'集中练习道路标志和标线。', href:'signs', icon:Signpost },
{ title:'错题本', description:'集中复习答错的题目。', href:'wrong-questions', icon:AlertTriangle },
{ title:'考试指南', description:'查看申请、笔试和路考流程。', href:'guide', icon:ShieldCheck },
]
export const openAALinks: ToolLink[] = [
{ title:'OpenAA 首页', description:'美国华人生活入口', href:'https://openaa.com', icon:Home },
{ title:'找工作', description:'查看和发布招聘信息', href:'https://openaa.com/jobs', icon:BriefcaseBusiness },
{ title:'二手市场', description:'查看本地二手信息', href:'https://openaa.com/marketplace', icon:ShoppingBag },
{ title:'美国新闻', description:'查看 OpenAA 新闻', href:'https://openaa.com/news', icon:Newspaper },
{ title:'DMV 工具', description:'驾照材料检查工具', href:'https://tools.openaa.com/usa/dmv/document-checker.html', icon:TrafficCone },
]
