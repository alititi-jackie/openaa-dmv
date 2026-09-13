import { californiaQuestions } from './california-questions'
import { californiaExpandedQuestions } from './california-questions-expanded'
import { getLiveStateBySlug, type DmvQuestion } from './dmv-data'
import { sharedCoreQuestions } from './shared-core-questions'
import { sharedCoreReplacements } from './shared-core-replacements'
import { sharedCoreSupplement } from './shared-core-supplement'
const sharedCoreBase = sharedCoreQuestions.filter((question) => !/^shared-core-\d+b$/.test(question.id))
const sharedCoreBank = [...sharedCoreBase, ...sharedCoreReplacements, ...sharedCoreSupplement]
function normalizeText(value: string) { return value.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '') }
function hashString(value: string) { let hash = 2166136261; for (let index = 0; index < value.length; index += 1) { hash ^= value.charCodeAt(index); hash = Math.imul(hash, 16777619) } return Math.abs(hash >>> 0) }
function balanceAnswerPosition(question: DmvQuestion): DmvQuestion { if (question.choices.length < 2) return question; const targetIndex = hashString(question.id) % question.choices.length; if (targetIndex === question.answerIndex) return question; const choices = [...question.choices]; const correctChoice = choices[question.answerIndex]; choices.splice(question.answerIndex, 1); choices.splice(targetIndex, 0, correctChoice); return { ...question, choices, answerIndex: targetIndex } }
function prepareQuestions(questions: DmvQuestion[]) { const ids=new Set<string>(),texts=new Set<string>(); return questions.filter(q=>{const t=normalizeText(q.question);if(ids.has(q.id)||texts.has(t))return false;ids.add(q.id);texts.add(t);return true}).map(balanceAnswerPosition) }
export function getQuestionSourceForLanguage(questionId: string): DmvQuestion | null { return [...californiaQuestions, ...californiaExpandedQuestions, ...sharedCoreBank].find((question) => question.id === questionId) ?? null }
export function getQuestionsForState(stateSlug: string): DmvQuestion[] { if (!getLiveStateBySlug(stateSlug)) return []; return stateSlug === 'california' ? prepareQuestions([...californiaQuestions, ...californiaExpandedQuestions, ...sharedCoreBank]) : prepareQuestions(sharedCoreBank) }
export function getQuestionsByCategory(stateSlug: string, category: DmvQuestion['category']) { return getQuestionsForState(stateSlug).filter((question) => question.category === category) }
export function getQuestionCountForState(stateSlug: string) { return getQuestionsForState(stateSlug).length }
