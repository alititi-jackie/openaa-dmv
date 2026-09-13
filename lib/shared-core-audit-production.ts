import type { DmvQuestion } from './dmv-data'

type AuditableQuestion = DmvQuestion & { en?: { question: string; choices: string[]; explanation: string } }

export function auditSharedCoreBank(questions: AuditableQuestion[]) {
  return questions.length === 150 ? [] : [`公共核心题库当前为 ${questions.length} 题，必须为 150 题`]
}

export function validateSharedCoreBank<T extends AuditableQuestion>(questions: T[]): T[] {
  const issues = auditSharedCoreBank(questions)
  if (issues.length > 0) throw new Error(issues[0])
  return questions
}
