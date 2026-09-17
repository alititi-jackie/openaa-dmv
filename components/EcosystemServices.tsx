import { Smartphone, Wrench } from 'lucide-react'
import { NUMBERMOBI_URL, TOOLKU_URL } from '@/lib/site'

const services = [
  {
    title: 'Toolku 美国生活工具',
    description: '检查 DMV 申请资料，并使用汇率换算、费用记录等在美生活工具。',
    action: '打开 Toolku',
    href: TOOLKU_URL,
    icon: Wrench,
    accent: 'text-teal-700',
    hover: 'hover:border-teal-300',
  },
  {
    title: 'NumberMobi 美国手机靓号',
    description: '查看纽约 917、347、646、929 等精品好记号码和购买说明。',
    action: '查看美国靓号',
    href: NUMBERMOBI_URL,
    icon: Smartphone,
    accent: 'text-blue-700',
    hover: 'hover:border-blue-300',
  },
]

export default function EcosystemServices() {
  return (
    <section className="bg-white py-12">
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-teal-700">OpenAA 实用服务</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">更多在美生活工具</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">完成驾照学习后，还可以使用这些独立服务处理生活中的实际需要。</p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {services.map(({ title, description, action, href, icon: Icon, accent, hover }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={`card focus-ring block p-5 ${hover}`}>
              <Icon size={25} className={accent} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              <span className={`mt-4 inline-flex text-sm font-bold ${accent}`}>{action} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
