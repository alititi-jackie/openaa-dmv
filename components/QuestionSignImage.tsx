'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'
import { getQuestionSignMeta } from '@/lib/sign-visuals'

export default function QuestionSignImage({question,stateSlug,large=false}:{question:DmvQuestion;stateSlug?:string;large?:boolean}) {
  const pathname=usePathname()
  const state=stateSlug ?? pathname.split('/').filter(Boolean)[0]
  if(!state) return null
  const sign=getQuestionSignMeta(question)
  if(!sign) return null
  return <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4"><img src={sign.imageUrl} alt={sign.alt} loading="lazy" className={`object-contain ${large?'h-48 w-48 md:h-56 md:w-56':'h-36 w-36 md:h-40 md:w-40'}`} /><figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">{sign.sourceLabel ?? 'MUTCD 标准样式学习图'} · {sign.code}</figcaption></figure>
}
