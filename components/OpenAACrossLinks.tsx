import { openAALinks } from '@/lib/dmv-data'

export default function OpenAACrossLinks() {
  return (
    <section className="bg-[#f6f1e8] py-12">
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-normal text-amber-800">OpenAA</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">考完驾照之后，还有美国生活要安顿</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            DMV 是第一步。找工作、找房、买车、二手交易和生活资讯，继续回到 OpenAA 主站完成下一步。
          </p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {openAALinks.map(({ title, description, href, icon: Icon }) => (
            <a key={href} href={href} className="card focus-ring block p-4 hover:border-amber-300">
              <Icon size={22} className="text-amber-800" />
              <h3 className="mt-3 text-base font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
