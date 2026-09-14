export default function MassachusettsRules() {
  const items = [
    ['正式考试', 'Class D learner’s permit exam 共 25 题，考试时间 25 分钟，至少答对 18 题通过。'],
    ['考试语言', 'RMV 提供多种考试语言，其中包括 Mandarin (Simplified)、Mandarin (Traditional) 和 English。'],
    ['JOL / 未满 18 岁', '参加路考前通常需要连续持有 permit 至少 6 个月、保持 6 个月清洁驾驶记录、完成 Driver Education，并完成至少 40 小时额外监督驾驶。'],
    ['Hands-Free', '18 岁及以上驾驶人使用电子设备时通常必须 hands-free；未满 18 岁驾驶人开车时不得使用电子设备，包括 hands-free。'],
    ['校车', '校车闪红灯时通常双向车辆都要停车；有实体隔离带的 divided highway 对向车辆属于主要例外。跟随校车时至少保持 100 英尺。'],
    ['Vulnerable Road Users', '超越自行车、行人等 vulnerable road user 时至少留出 4 英尺；必要时可在安全并遵守限速的前提下使用相邻车道或越过中心线。'],
    ['White Cane Law', '遇到使用白手杖或导盲犬的视障行人过街时必须完全停车，并等待其安全通过。'],
  ]

  return <section className="bg-white py-10"><div className="page-shell"><div className="card p-5"><div className="max-w-3xl"><p className="text-sm font-bold text-teal-700">Massachusetts RMV 重点规则</p><h2 className="mt-2 text-2xl font-black text-slate-950">麻州考试规则与高频考点</h2><p className="mt-2 text-sm leading-6 text-slate-600">下面是学习说明，不混入题库充当说明题。题库只保留适合 Class D Permit 知识考试练习的规则、标志和安全驾驶题目。</p></div><div className="mt-5 grid gap-3 md:grid-cols-2">{items.map(([title,text]) => <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="font-black text-slate-950">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>)}</div><p className="mt-4 text-xs leading-5 text-slate-500">考试和驾照要求可能调整，正式规定请以 Massachusetts RMV 当前 Driver’s Manual 和官方页面为准。</p></div></div></section>
}
