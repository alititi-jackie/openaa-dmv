import { ExternalLink } from 'lucide-react'

export default function ExternalLinkAnchor({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`focus-ring inline-flex items-center rounded-md ${className}`}>{children}<ExternalLink size={14} className="ml-1.5 shrink-0" aria-hidden="true" /></a>
}
