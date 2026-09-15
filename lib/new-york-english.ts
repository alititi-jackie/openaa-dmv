import type { DmvEnglishContent } from './dmv-language'
import source from '@/data/new-york/openaa-ny-dmv-questions-v1.json'

type SourceQuestion = {
  id: number
  question: string
  options: string[]
  answerIndex: number
  explanation?: string | null
}

// English content for the OpenAA New York bank lives here so the original
// audited Chinese source remains untouched. Entries are keyed by the stable
// adapter id used throughout dmv.openaa.com.
//
// IMPORTANT: Do not silently machine-fallback missing entries to Chinese.
// englishCoverage() must reflect the real translated coverage.
export const newYorkEnglishById: Record<string, DmvEnglishContent> = {}

export const NEW_YORK_ENGLISH_TARGET = (source.questions as SourceQuestion[]).length

export function newYorkEnglishCoverage() {
  return Object.keys(newYorkEnglishById).length
}
