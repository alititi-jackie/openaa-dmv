import type { DmvQuestion } from './dmv-data'
import { californiaEnglishById } from './california-english'
import { californiaCoreEnglishById } from './california-english-core'
import { californiaExpandedEnglishById } from './california-english-expanded'
import { californiaQualityEnglishById } from './california-english-quality'

type EnglishContent = { question: string; choices: string[]; explanation: string }

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '')
}

function englishFor(id: string): EnglishContent | undefined {
  return californiaQualityEnglishById[id]
    ?? californiaEnglishById[id]
    ?? californiaCoreEnglishById[id]
    ?? californiaExpandedEnglishById[id]
}

export function validateCaliforniaSpecificBank<T extends DmvQuestion>(questions: T[]): T[] {
  const issues: string[] = []
  const ids = new Set<string>()
  const zhQuestions = new Set<string>()
  const enQuestions = new Set<string>()

  if (questions.length !== 152) issues.push(`加州专属源题必须为 152 题，当前为 ${questions.length} 题`)

  for (const question of questions) {
    const label = question.id || 'unknown'
    if (ids.has(label)) issues.push(`${label}: ID 重复`)
    ids.add(label)

    const zh = normalize(question.question)
    if (!zh) issues.push(`${label}: 中文题干为空`)
    else if (zhQuestions.has(zh)) issues.push(`${label}: 中文题干完全重复`)
    zhQuestions.add(zh)

    if (question.choices.length < 3) issues.push(`${label}: 中文选项不足 3 个`)
    if (question.answerIndex < 0 || question.answerIndex >= question.choices.length) issues.push(`${label}: 答案索引无效`)
    if (!question.explanation.trim()) issues.push(`${label}: 缺少中文解析`)

    const en = englishFor(label)
    if (!en) {
      issues.push(`${label}: 缺少英文内容`)
      continue
    }

    const enText = normalize(en.question)
    if (!enText) issues.push(`${label}: 英文题干为空`)
    else if (enQuestions.has(enText)) issues.push(`${label}: 英文题干完全重复`)
    enQuestions.add(enText)

    if (en.choices.length !== question.choices.length) issues.push(`${label}: 中英文选项数量不一致`)
    if (!en.explanation.trim()) issues.push(`${label}: 缺少英文解析`)
  }

  if (issues.length > 0) {
    throw new Error(`California DMV bank validation failed: ${issues.join(' | ')}`)
  }

  return questions
}
