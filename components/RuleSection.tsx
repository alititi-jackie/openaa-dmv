type Props = {
  eyebrow: string
  title: string
  description: string
  items: readonly string[][]
  footnote?: string
}

export default function RuleSection({ eyebrow, title, description, items, footnote }: Props) {
  return <section className="bg-white py-10"><div className="page-shell"><div className="card p-5"><div className="max-w-3xl"><p className="text-sm font-bold text-teal-700">{eyebrow}</p><h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div><div className="mt-5 grid gap-3 md:grid-cols-2">{items.map(([itemTitle,text]) => <div key={itemTitle} className="rounded-lg border border-slate-200 bg-slate-50 p-4"><h3 className="font-black text-slate-950">{itemTitle}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>)}</div>{footnote ? <p className="mt-4 text-xs leading-5 text-slate-500">{footnote}</p> : null}</div></div></section>
}
