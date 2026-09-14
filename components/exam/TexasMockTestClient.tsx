'use client'

import MockTestClient from '@/components/exam/MockTestClient'
import type { DmvQuestion } from '@/lib/dmv-data'
import type { StateExamConfig } from '@/lib/exam/exam-types'

export default function TexasMockTestClient({ questions, config }: { questions: DmvQuestion[]; config: StateExamConfig }) {
  return <MockTestClient questions={questions} stateSlug="texas" config={config} allowedLanguages={['en','bilingual']} defaultLanguage="en" />
}
