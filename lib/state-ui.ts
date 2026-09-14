import type { DmvState } from './dmv-data'

export function stateAgencyShort(state: DmvState) {
  if (state.slug === 'new-jersey') return 'MVC'
  if (state.slug === 'massachusetts') return 'RMV'
  if (state.slug === 'washington') return 'DOL'
  if (state.slug === 'texas') return 'DPS'
  if (state.slug === 'pennsylvania') return 'PennDOT'
  return 'DMV'
}

export function stateAgencyLabel(state: DmvState) {
  return `${state.nameZh} ${stateAgencyShort(state)}`
}

export function stateBackLabel(state: DmvState) {
  return `返回${stateAgencyLabel(state)}`
}
