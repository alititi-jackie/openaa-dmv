export function normalizeSeoText(value: string) {
  return value.replaceAll('路标题', '路标')
}

export function normalizeSeoKeywords(values: string[]) {
  return values.map(normalizeSeoText)
}
