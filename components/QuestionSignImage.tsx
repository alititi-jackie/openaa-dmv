'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type SignMeta = {
  imageUrl: string
  alt: string
  code?: string
  source: 'California DMV' | 'FHWA MUTCD'
}

const FHWA = 'https://mutcd.fhwa.dot.gov/services/publications/fhwaop02090/images'

const CALIFORNIA_SIGN_RULES: Array<{ test: RegExp; sign: SignMeta }> = [
  {
    test: /(红色八角形|八角形红色|\bSTOP\b|停车标志)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_stopsign.gif',
      alt: 'California DMV STOP 停车标志',
      code: 'R1-1',
      source: 'California DMV',
    },
  },
  {
    test: /(倒三角形红白|倒三角红白|红白倒三角|\bYIELD\b|让行标志)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_yieldsign.gif',
      alt: 'California DMV YIELD 让行标志',
      code: 'R1-2',
      source: 'California DMV',
    },
  },
  {
    test: /(DO NOT ENTER|禁止驶入)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/donotenter.png',
      alt: 'California DMV DO NOT ENTER 禁止驶入标志',
      code: 'R5-1',
      source: 'California DMV',
    },
  },
  {
    test: /(WRONG WAY|方向错误|逆向标志)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_wrong_way_sign.gif',
      alt: 'California DMV WRONG WAY 方向错误标志',
      code: 'R5-1a',
      source: 'California DMV',
    },
  },
  {
    test: /(NO U-?TURN|禁止掉头|U 型掉头)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/nouturn.png',
      alt: 'California DMV NO U-TURN 禁止掉头标志',
      code: 'R3-4',
      source: 'California DMV',
    },
  },
  {
    test: /(圆形黄色铁路|铁路预警标志|前方铁路道口)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/railroad.png',
      alt: 'California DMV 铁路道口预警标志',
      code: 'W10-1',
      source: 'California DMV',
    },
  },
  {
    test: /(Crossbuck|交叉形.*铁路|铁路道口的交叉形)/i,
    sign: {
      imageUrl: `${FHWA}/r15-1.svg`,
      alt: 'FHWA MUTCD Crossbuck 铁路道口标志',
      code: 'R15-1',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(五边形黄色|学校区域|学童区域|SCHOOL)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/schoolzone.png',
      alt: 'California DMV 学校区域标志',
      code: 'S1-1',
      source: 'California DMV',
    },
  },
  {
    test: /(黄色菱形|警告标志.*菱形|菱形.*警告|弯道警告|前方弯道|Curve)/i,
    sign: {
      imageUrl: `${FHWA}/w1-2.svg`,
      alt: 'FHWA MUTCD 黄色菱形弯道警告标志',
      code: 'W1-2',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(橙色菱形|施工或维护区域|施工.*警告|道路施工)/i,
    sign: {
      imageUrl: `${FHWA}/w20-1.svg`,
      alt: 'FHWA MUTCD 道路施工警告标志',
      code: 'W20-1',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(白底黑字矩形|白色矩形|限速标志|SPEED LIMIT)/i,
    sign: {
      imageUrl: `${FHWA}/r2-1.svg`,
      alt: 'FHWA MUTCD SPEED LIMIT 法规标志',
      code: 'R2-1',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(前方信号灯|交通信号灯.*前方|Signal Ahead)/i,
    sign: {
      imageUrl: `${FHWA}/w3-3.svg`,
      alt: 'FHWA MUTCD 前方交通信号灯标志',
      code: 'W3-3',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(车流汇入|合流标志|Merging Traffic|Merge)/i,
    sign: {
      imageUrl: `${FHWA}/w4-1.svg`,
      alt: 'FHWA MUTCD 车流汇入警告标志',
      code: 'W4-1',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(行人过街|行人.*警告标志|Pedestrian Crossing)/i,
    sign: {
      imageUrl: `${FHWA}/w11-2.svg`,
      alt: 'FHWA MUTCD 行人过街警告标志',
      code: 'W11-2',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(湿滑|Slippery When Wet)/i,
    sign: {
      imageUrl: `${FHWA}/w8-5.svg`,
      alt: 'FHWA MUTCD 湿滑路面警告标志',
      code: 'W8-5',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(车道结束|Lane Ends)/i,
    sign: {
      imageUrl: `${FHWA}/w4-2.svg`,
      alt: 'FHWA MUTCD 车道结束警告标志',
      code: 'W4-2',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(道路变窄|Road Narrows)/i,
    sign: {
      imageUrl: `${FHWA}/w5-1.svg`,
      alt: 'FHWA MUTCD 道路变窄警告标志',
      code: 'W5-1',
      source: 'FHWA MUTCD',
    },
  },
  {
    test: /(双向交通|Two-Way Traffic)/i,
    sign: {
      imageUrl: `${FHWA}/w6-3.svg`,
      alt: 'FHWA MUTCD 双向交通警告标志',
      code: 'W6-3',
      source: 'FHWA MUTCD',
    },
  },
]

export function getQuestionSignMeta(question: DmvQuestion): SignMeta | null {
  if (question.category !== 'signs') return null
  const searchable = `${question.question} ${question.explanation}`
  return CALIFORNIA_SIGN_RULES.find((item) => item.test.test(searchable))?.sign ?? null
}

export default function QuestionSignImage({
  question,
  stateSlug,
  large = false,
}: {
  question: DmvQuestion
  stateSlug?: string
  large?: boolean
}) {
  const pathname = usePathname()
  const effectiveStateSlug = stateSlug ?? pathname.split('/').filter(Boolean)[0]
  if (effectiveStateSlug !== 'california') return null

  const sign = getQuestionSignMeta(question)
  if (!sign) return null

  return (
    <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
      <img
        src={sign.imageUrl}
        alt={sign.alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`object-contain ${large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'}`}
      />
      <figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">
        {sign.source} 官方标准图{sign.code ? ` · ${sign.code}` : ''}
      </figcaption>
    </figure>
  )
}
