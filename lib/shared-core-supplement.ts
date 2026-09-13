import type { DmvQuestion } from './dmv-data'

type BilingualQuestion = DmvQuestion & { en: { question: string; choices: string[]; explanation: string } }
export const sharedCoreSupplement: BilingualQuestion[] = []
