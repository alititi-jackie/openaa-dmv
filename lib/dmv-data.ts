import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  AlertTriangle,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardList,
  FileQuestion,
  Home,
  Newspaper,
  ShieldCheck,
  ShoppingBag,
  Signpost,
  TrafficCone,
} from 'lucide-react'
import { OPENAA_DMV_URL } from './site'

export type StateStatus = 'live' | 'external' | 'coming-soon'

export type DmvState = {
  slug: string
  code: string
  nameEn: string
  nameZh: string
  shortZh: string
  status: StateStatus
  questionCount: number
  examRule: string
  passRule: string
  officialName: string
  officialUrl: string
  driverManualUrl: string
  permitUrl: string
  roadTestUrl: string
  externalUrl?: string
  popular?: boolean
  summary: string
  guide: string[]
}

export type DmvQuestion = {
  id: string
  category: 'rules' | 'signs' | 'safety' | 'documents'
  question: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export type ToolLink = {
  title: string
  description: string
  href: string
  icon: ComponentType<LucideProps>
}

export const dmvStates: DmvState[] = [
  {
    slug: 'new-york',
    code: 'NY',
    nameEn: 'New York',
    nameZh: '纽约州',
    shortZh: '纽约',
    status: 'external',
    questionCount: 150,
    examRule: '纽约 DMV Permit 笔试通常为 20 题。',
    passRule: '至少答对 14 题，并满足交通标志题要求。',
    officialName: 'New York DMV',
    officialUrl: 'https://dmv.ny.gov/',
    driverManualUrl: 'https://dmv.ny.gov/driver-license/drivers-manual-practice-tests',
    permitUrl: 'https://dmv.ny.gov/driver-license/get-learner-permit',
    roadTestUrl: 'https://dmv.ny.gov/driver-license/schedule-and-take-road-test',
    externalUrl: OPENAA_DMV_URL,
    popular: true,
    summary: '纽约 DMV 中文题库已在 OpenAA 主站承接，当前站点负责其他州扩展。',
    guide: ['确认身份、年龄和居住地址材料。', '阅读纽约官方 Driver Manual。', '完成 Permit 笔试后再准备路考预约。'],
  },
  {
    slug: 'california',
    code: 'CA',
    nameEn: 'California',
    nameZh: '加利福尼亚州',
    shortZh: '加州',
    status: 'live',
    questionCount: 180,
    examRule: 'California DMV 当前公布的知识考试通过标准为 80%。',
    passRule: '本站提供 36 题标准模拟和 46 题青少年强化模拟；实际考试题量、申请类型和考试安排请以 California DMV 当次规定为准。',
    officialName: 'California DMV',
    officialUrl: 'https://www.dmv.ca.gov/',
    driverManualUrl: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/',
    permitUrl: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/instruction-permits/',
    roadTestUrl: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/drive-test/',
    popular: true,
    summary: '适合准备加州 Permit 笔试的新移民、留学生和第一次申请驾照用户。',
    guide: [
      '先阅读 California Driver Handbook，重点看路权、限速、酒驾和行人规则。',
      '准备身份证明、居住地址和申请材料。',
      '完成笔试后，根据 permit 限制和年龄要求安排练车与路考。',
    ],
  },
  {
    slug: 'new-jersey',
    code: 'NJ',
    nameEn: 'New Jersey',
    nameZh: '新泽西州',
    shortZh: '新泽西',
    status: 'live',
    questionCount: 28,
    examRule: '新泽西 MVC 知识考试重点覆盖路权、标志、安全驾驶和酒驾规则。',
    passRule: '练习时应稳定达到 80% 以上正确率，再预约正式考试。',
    officialName: 'New Jersey MVC',
    officialUrl: 'https://www.nj.gov/mvc/',
    driverManualUrl: 'https://www.nj.gov/mvc/about/manuals.htm',
    permitUrl: 'https://www.nj.gov/mvc/license/firstlic.htm',
    roadTestUrl: 'https://www.nj.gov/mvc/license/roadtest.htm',
    popular: true,
    summary: '面向在新泽西考驾照的中文用户，整理 MVC 常见考试知识点。',
    guide: [
      '确认自己属于首次申请、转州换照还是未成年 GDL 流程。',
      '复习标志、停车距离、路口让行和安全跟车。',
      '使用官方 MVC 页面核对预约、证件和考试地点。',
    ],
  },
]
