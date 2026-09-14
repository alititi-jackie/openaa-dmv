export default function PennsylvaniaRules() {
  const rules = [
    ['正式知识考试', 'PennDOT Knowledge Test 共 18 题，至少答对 15 题通过。'],
    ['校车', '红灯闪烁并伸出 STOP ARM 时通常须在至少 10 英尺外停车；实体隔离道路的对向交通适用例外。'],
    ['学校区域', 'School Zone 限速生效时通常为 15 mph。'],
    ['Move Over', '能安全换道时驶离紧邻紧急响应区域的车道；不能安全换道时，应按规定显著减速。'],
    ['雨刷与车灯', '因天气使用挡风玻璃雨刷时，应同时打开前灯。'],
    ['未满 18 岁', 'Learner’s Permit 通常至少持有 6 个月，并完成 65 小时监督驾驶，其中至少 10 小时夜间、5 小时恶劣天气。'],
    ['积分制度', '驾驶记录达到 6 points 时，PennDOT 会按规定启动相应纠正措施。'],
  ]

  return <section className="bg-white py-10">
    <div className="page-shell">
      <div className="card p-5">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-teal-700">PennDOT 重点规则</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">宾州笔试先记住这些规则</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">下面是学习说明，不混入题库充当考题。题库只保留适合知识考试练习的题目。</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {rules.map(([title, text]) => <div key={title} className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-black text-slate-950">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
          </div>)}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">规则依据 PennDOT 官方 Driver’s Manual 与 Driver and Vehicle Services 公布信息整理；正式考试及法规变化以 PennDOT 最新内容为准。</p>
      </div>
    </div>
  </section>
}
