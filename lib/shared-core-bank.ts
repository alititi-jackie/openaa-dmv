import { sharedCoreQuestions } from './shared-core-questions'
import { sharedCoreReplacements } from './shared-core-replacements'
import { sharedCoreSupplement } from './shared-core-supplement'
import { validateSharedCoreBank } from './shared-core-audit-production'

const sharedCoreBase = sharedCoreQuestions.filter((question) => !/^shared-core-\d+b$/.test(question.id))

export const sharedCoreBank = validateSharedCoreBank([
  ...sharedCoreBase,
  ...sharedCoreReplacements,
  ...sharedCoreSupplement,
])
