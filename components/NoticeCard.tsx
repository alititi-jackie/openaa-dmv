import { AlertTriangle, Info } from 'lucide-react'

export default function NoticeCard({ title, children, tone = 'info', className = '' }: { title: string; children: React.ReactNode; tone?: 'info' | 'warning'; className?: string }) {
  const warning = tone === 'warning'
  const Icon = warning ? AlertTriangle : Info
  return <div className={`rounded-lg border p-4 ${warning ? 'border-amber-300 bg-amber-50 text-amber-950' : 'border-blue-200 bg-blue-50 text-blue-950'} ${className}`}><div className="flex items-start gap-3"><Icon size={20} className={`mt-0.5 shrink-0 ${warning ? 'text-amber-700' : 'text-blue-700'}`}/><div><p className="font-black">{title}</p><div className="mt-1 text-sm leading-6">{children}</div></div></div></div>
}
