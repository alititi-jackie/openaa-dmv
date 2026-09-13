import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { dmvTools, type DmvState } from '@/lib/dmv-data'

export default function ToolGrid({ state }: { state: DmvState }) {
  return (
    <section className="bg-white py-10">
      <div className="page-shell">
        <div className="grid gap-3 md:grid-cols-5">
          {dmvTools.map(({ title, description, href, icon: Icon }) => {
            const displayTitle = href === 'questions' ? 'DMV 题库' : title
            return (
              <Link key={href} href={`/${state.slug}/${href}`} className="card focus-ring p-4 hover:border-blue-300">
                <Icon size={24} className="text-blue-700" />
                <h2 className="mt-3 text-lg font-black text-slate-950">{displayTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </Link>
            )
          })}
          <Link href={`/${state.slug}/wrong-questions`} className="card focus-ring p-4 hover:border-rose-300">
            <AlertCircle size={24} className="text-rose-700" />
            <h2 className="mt-3 text-lg font-black text-slate-950">错题本</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">自动保存做错题目，集中复习薄弱点。</p>
          </Link>
        </div>
      </div>
    </section>
  )
}
