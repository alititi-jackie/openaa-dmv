// Best-effort persistence: blocked/full storage must never interrupt studying.
const fallback = new Map<string, string | null>()
const listeners = new Set<() => void>()
let failed = false

function reportFailure() {
  if (failed) return
  failed = true
  queueMicrotask(() => listeners.forEach((listener) => listener()))
}

export const browserStorage = {
  getItem(key: string): string | null {
    if (fallback.has(key)) return fallback.get(key) ?? null
    if (typeof window === 'undefined') return null
    try { return window.localStorage.getItem(key) } catch { reportFailure(); return null }
  },
  setItem(key: string, value: string) {
    try { window.localStorage.setItem(key, value); fallback.delete(key) }
    catch { fallback.set(key, value); reportFailure() }
  },
  removeItem(key: string) {
    try { window.localStorage.removeItem(key); fallback.delete(key) }
    catch { fallback.set(key, null); reportFailure() }
  },
}

export function readIds(key: string): string[] {
  try {
    const value: unknown = JSON.parse(browserStorage.getItem(key) || '[]')
    return Array.isArray(value) ? Array.from(new Set(value.filter((id): id is string => typeof id === 'string'))) : []
  } catch { return [] }
}

export function writeIds(key: string, ids: string[]) {
  browserStorage.setItem(key, JSON.stringify(Array.from(new Set(ids))))
}

export function subscribeStorageFailure(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
export function storageHasFailed() { return failed }

export function readLastExamScore(stateSlug: string): number {
  // Keep legacy records intact. New submissions use the canonical, state-scoped key.
  for (const suffix of ['exam:last-score', 'wrong:last-mock-score', 'last-score']) {
    const raw = browserStorage.getItem(`openaa-dmv:${stateSlug}:${suffix}`)
    if (raw === null || raw.trim() === '') continue
    const score = Number(raw)
    if (Number.isFinite(score) && score >= 0 && score <= 100) return score
  }
  return 0
}
