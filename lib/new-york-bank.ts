import type { DmvQuestion } from './dmv-data'
import { newYorkQuestions } from './new-york-questions'

// New York is intentionally an independent OpenAA bank. Preserve its stable
// IDs and do not mix Shared Core questions into this state-specific source.
export function getNewYorkQuestions(): DmvQuestion[] {
  return [...newYorkQuestions]
}
