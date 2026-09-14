export function examStorageKeys(stateSlug: string) {
  const base = `openaa-dmv:${stateSlug}`
  return {
    wrong: `${base}:wrong`,
    resume: `${base}:exam:resume`,
    lastScore: `${base}:exam:last-score`,
    language: `${base}:language`,
    answered: `${base}:answered`,
    correct: `${base}:correct`,
    mastered: `${base}:mastered`,
    favorites: `${base}:favorites`,
  }
}
