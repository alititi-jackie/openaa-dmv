import type { DmvQuestion } from './dmv-data'
import { californiaCoreEnglishById } from './california-english-core'
import { sharedCoreEnglish } from './shared-core-english'

type EnglishContent = { question: string; choices: string[]; explanation: string }
type AuditableQuestion = DmvQuestion & { en?: EnglishContent }

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '')
}

export function validateSharedCoreBank<T extends AuditableQuestion>(questions: T[]): T[] {
  const errors: string[] = []
  const ids = new Set<string>()
  const chinese = new Set<string>()
  const english = new Set<string>()

  if (questions.length !== 150) errors.push(`公共核心题库必须严格为 150 题，当前为 ${questions.length} 题`)

  for (const question of questions) {
    const label = question.id || 'unknown'
    if (ids.has(label)) errors.push(`${label}: ID 重复`)
    ids.add(label)

    const zh = normalize(question.question)
    if (!zh) errors.push(`${label}: 缺少中文题干`)
    else if (chinese.has(zh)) errors.push(`${label}: 中文题干完全重复`)
    chinese.add(zh)

    if (question.choices.length < 2) errors.push(`${label}: 中文选项不足`)
    if (question.answerIndex < 0 || question.answerIndex >= question.choices.length) errors.push(`${label}: 答案索引无效`)
    if (!question.explanation.trim()) errors.push(`${label}: 缺少中文解析`)

    const en = question.en ?? sharedCoreEnglish[label] ?? californiaCoreEnglishById[label]
    if (!en) {
      errors.push(`${label}: 缺少英文内容`)
      continue
    }

    const enText = normalize(en.question)
    if (!enText) errors.push(`${label}: 缺少英文题干`)
    else if (english.has(enText)) errors.push(`${label}: 英文题干完全重复`)
    english.add(enText)

    if (en.choices.length !== question.choices.length) errors.push(`${label}: 中英文选项数量不一致`)
    if (!en.explanation.trim()) errors.push(`${label}: 缺少英文解析`)
  }

  if (errors.length) throw new Error(`Shared DMV core bank validation failed:\n${errors.join('\n')}`)
  return questions
}
