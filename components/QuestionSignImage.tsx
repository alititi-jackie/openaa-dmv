import type { DmvQuestion } from '@/lib/dmv-data'

type SignMeta = {
  imageUrl: string
  alt: string
  code?: string
}

const CALIFORNIA_SIGN_RULES: Array<{ test: RegExp; sign: SignMeta }> = [
  {
    test: /(红色八角形|八角形红色|\bSTOP\b|停车标志)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_stopsign.gif',
      alt: 'California DMV STOP 停车标志',
      code: 'R1-1',
    },
  },
  {
    test: /(倒三角形红白|红白倒三角|\bYIELD\b|让行标志)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_yieldsign.gif',
      alt: 'California DMV YIELD 让行标志',
      code: 'R1-2',
    },
  },
  {
    test: /(DO NOT ENTER|禁止驶入)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/donotenter.png',
      alt: 'California DMV DO NOT ENTER 禁止驶入标志',
      code: 'R5-1',
    },
  },
  {
    test: /(WRONG WAY|方向错误|逆向标志)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_wrong_way_sign.gif',
      alt: 'California DMV WRONG WAY 方向错误标志',
      code: 'R5-1a',
    },
  },
  {
    test: /(NO U-?TURN|禁止掉头|U 型掉头)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/nouturn.png',
      alt: 'California DMV NO U-TURN 禁止掉头标志',
      code: 'R3-4',
    },
  },
  {
    test: /(圆形黄色铁路|铁路预警标志|前方铁路道口)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/railroad.png',
      alt: 'California DMV 铁路道口预警标志',
      code: 'W10-1',
    },
  },
  {
    test: /(五边形黄色|学校区域|学童区域|SCHOOL)/i,
    sign: {
      imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/schoolzone.png',
      alt: 'California DMV 学校区域标志',
      code: 'S1-1',
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
  stateSlug: string
  large?: boolean
}) {
  if (stateSlug !== 'california') return null
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
        California DMV 官方图{sign.code ? ` · ${sign.code}` : ''}
      </figcaption>
    </figure>
  )
}
