import type { DmvQuestion } from './dmv-data'

type English = { question: string; choices: string[]; explanation: string }
type Auditable = DmvQuestion & { en?: English }
const risky = [/\b(?:California|Pennsylvania|New York|Texas|Florida|Washington|Massachusetts|New Jersey)\b/i,/\b(?:加州|宾州|纽约州|德州|佛州|华州|麻州|新泽西州)\b/,/\bBAC\b/i,/\$\s?\d/,/\b\d+(?:\.\d+)?\s?(?:mph|feet|foot|ft|inches|inch|days|day|years|year)\b/i,/\b\d+(?:\.\d+)?%\b/,/\b\d+\s?(?:英尺|英寸|英里|天|岁|美元)\b/]
const norm=(v:string)=>v.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g,'')
export function validateSharedCoreBank<T extends Auditable>(questions:T[]):T[]{
 const errors:string[]=[]; const ids=new Set<string>(); const zh=new Set<string>(); const enSeen=new Set<string>();
 if(questions.length!==150) errors.push(`公共核心题库必须严格为 150 题，当前为 ${questions.length} 题`)
 questions.forEach((q,i)=>{const label=q.id||`index-${i}`; if(ids.has(q.id))errors.push(`重复 ID: ${q.id}`);ids.add(q.id);const z=norm(q.question);if(!z)errors.push(`${label} 缺少中文题干`);else if(zh.has(z))errors.push(`${label} 中文题干完全重复`);else zh.add(z);if(q.choices.length<2)errors.push(`${label} 中文选项不足`);if(q.answerIndex<0||q.answerIndex>=q.choices.length)errors.push(`${label} 中文答案索引无效`);if(!q.explanation.trim())errors.push(`${label} 缺少中文解析`);if(q.en){const e=norm(q.en.question);if(!e)errors.push(`${label} 英文题干为空`);else if(enSeen.has(e))errors.push(`${label} 英文题干完全重复`);else enSeen.add(e);if(q.en.choices.length!==q.choices.length)errors.push(`${label} 中英文选项数量不一致`);if(!q.en.explanation.trim())errors.push(`${label} 缺少英文解析`)}const all=[q.question,...q.choices,q.explanation,q.en?.question??'',...(q.en?.choices??[]),q.en?.explanation??''].join(' ');if(risky.some(p=>p.test(all)))errors.push(`${label} 含疑似州专属数字、名称或规则`)});if(errors.length)throw new Error(`Shared DMV core bank validation failed:\n${errors.join('\n')}`);return questions
}
