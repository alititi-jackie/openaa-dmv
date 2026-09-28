import type { DmvState } from './dmv-data'

/**
 * DMV architecture contract.
 *
 * New York intentionally uses its own independent question bank and exam engine.
 * Other live states use the shared/state-composed question-bank path and their
 * own StateExamConfig. UI may be shared; question sources and exam rules are not.
 */
export type QuestionBankStrategy = 'independent' | 'shared-plus-state'

export type StateArchitecture = {
  questionBank: QuestionBankStrategy
  examRules: 'state-specific'
}

export function getStateArchitecture(stateSlug: string): StateArchitecture {
  return {
    questionBank: stateSlug === 'new-york' || stateSlug === 'ny' ? 'independent' : 'shared-plus-state',
    examRules: 'state-specific',
  }
}

export function usesIndependentQuestionBank(state: Pick<DmvState, 'slug'> | string) {
  const slug = typeof state === 'string' ? state : state.slug
  return getStateArchitecture(slug).questionBank === 'independent'
}
