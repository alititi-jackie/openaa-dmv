import { sharedCoreQuestions } from './shared-core-questions'
import { sharedCoreReplacements } from './shared-core-replacements'
import { sharedCoreSupplement } from './shared-core-supplement'

export type SharedCoreEnglishContent = { question: string; choices: string[]; explanation: string }

const embedded = [...sharedCoreQuestions, ...sharedCoreReplacements, ...sharedCoreSupplement] as Array<{ id: string; en?: SharedCoreEnglishContent }>
export const sharedCoreEnglish: Record<string, SharedCoreEnglishContent> = Object.fromEntries(
  embedded.filter((question) => question.en).map((question) => [question.id, question.en as SharedCoreEnglishContent]),
)
