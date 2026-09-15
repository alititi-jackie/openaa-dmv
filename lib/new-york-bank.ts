import type { DmvQuestion } from './dmv-data'
import { newYorkQuestions } from './new-york-questions'

// New York is intentionally an independent OpenAA bank. Preserve the 150
// source entries and their stable order exactly; do not text-dedupe or mix in
// Shared Core questions here. The legacy OpenAA source itself contains review
// variants, and parity with OpenAA.com/dmv takes priority for this bank.
export function getNewYorkQuestions(): DmvQuestion[] {
  return [...newYorkQuestions]
}
