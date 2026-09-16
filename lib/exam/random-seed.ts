export function newExamSeed(): number {
  return globalThis.crypto.getRandomValues(new Uint32Array(1))[0] % 233280
}
