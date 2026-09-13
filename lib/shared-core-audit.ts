import type { DmvQuestion } from './dmv-data'

export type SharedCoreEnglish = {
  question: string
  choices: string[]
  explanation: string
}

type AuditableQuestion = DmvQuestion & { en?: SharedCoreEnglish }

const STATE_SPECIFIC_PATTERNS = [
  /\b(?:California|Pennsylvania|New York|Texas|Florida|Washington|Massachusetts|New Jersey)\b/i,
  /\b(?:加州|宾州|纽约州|德州|佛州|华州|麻州|新泽西州)\b/,
  /\bBAC\b/i,
  /\$\s?\d/,
  /\b\d+(?:\.\d+)?\s?(?:mph|feet|foot|ft|inches|inch|days|day|years|year)\b/i,
  /\b\d+(?:\.\d+)?%\b/,
  /\b\d+\s?(?:英尺|英寸|英里|天|岁|美元)\b/,
]

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '')
}

export function validateSharedCoreBank(questions: AuditableQuestion[]) {
  const errors: string[] = []
  const ids = new Set<string>()
  const zhQuestions = new Set<string>()
  const enQuestions = new Set<string>()

  if (questions.length !== 150) errors.push(`公共核心题库必须严格为 150 题，当前为 ${questions.length} 题`)

  questions.forEach((question, index) => {
    const label = question.id || `index-${index}`
    if (!question.id) errors.push(`第 ${index + 1} 题缺少 ID`)
    else if (ids.has(question.id)) errors.push(`重复 ID: ${question.id}`)
    else ids.add(question.id)

    const zh = normalize(question.question)
    if (!zh) errors.push(`${label} 缺少中文题干`)
    else if (zhQuestions.has(zh)) errors.push(`${label} 中文题干完全重复`)
    else zhQuestions.add(zh)

    if (question.choices.length < 2) errors.push(`${label} 中文选项不足`)
    if (question.answerIndex < 0 || question.answerIndex >= question.choices.length) errors.push(`${label} 中文答案索引无效`)
    if (!question.explanation.trim()) errors.push(`${label} 缺少中文解析`)

    const en = question.en
    if (!en) {
      errors.push(`${label} 缺少英文内容`)
    } else {
      const enText = normalize(en.question)
      if (!enText) errors.push(`${label} 缺少英文题干`)
      else if (enQuestions.has(enText)) errors.push(`${label} 英文题干完全重复`)
      else enQuestions.add(enText)
      if (en.choices.length !== question.choices.length) errors.push(`${label} 中英文选项数量不一致`)
      if (!en.explanation.trim()) errors.push(`${label} 缺少英文解析`)
    }

    const combined = [question.question, ...question.choices, question.explanation, en?.question ?? '', ...(en?.choices ?? []), en?.explanation ?? ''].join(' ')
    for (const pattern of STATE_SPECIFIC_PATTERNS) {
      if (pattern.test(combined)) {
        errors.push(`${label} 含疑似州专属数字、名称或规则，需要移入州题库: ${pattern}`)
        break
      }
    }
  })

  if (errors.length) throw new Error(`Shared DMV core bank validation failed:\n${errors.join('\n')}`)
  return questions as DmvQuestion[]
}
