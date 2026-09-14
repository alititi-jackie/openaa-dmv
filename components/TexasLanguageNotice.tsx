import { AlertTriangle } from 'lucide-react'

export default function TexasLanguageNotice() {
  return <section className="bg-white py-5"><div className="page-shell"><div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-5 shadow-sm"><div className="flex gap-3"><AlertTriangle className="mt-0.5 shrink-0 text-amber-700" size={26} /><div><p className="text-sm font-black uppercase tracking-wide text-amber-800">重要提醒 · Texas DPS 正式考试语言</p><h2 className="mt-1 text-xl font-black text-slate-950">德州普通非商业驾照 Knowledge Test 目前不提供中文考试</h2><p className="mt-2 text-sm leading-6 text-slate-700">Texas DPS 当前说明：正式知识考试提供 English 或 Spanish。本站提供中文、English 和中英对照题库，是为了帮助你理解规则和熟悉英文考试词汇；正式考试时请按 DPS 或授权考试机构的当日语言安排参加考试。</p></div></div></div></div></section>
}
