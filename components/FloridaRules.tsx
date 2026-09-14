export default function FloridaRules() {
  const items = [
    ['Class E Knowledge Exam', '正式知识考试为 50 道选择题，内容覆盖 Florida traffic laws、安全驾驶和 traffic controls。'],
    ['在线考试时限', 'FLHSMV 对授权第三方在线 Class E Knowledge Exam 要求 60 分钟时限。'],
    ['Learner’s License', '通常最低 15 岁；驾驶时需要至少 21 岁持照驾驶人陪同。'],
    ['Learner 时间限制', '取得 learner 后前 3 个月通常只能白天驾驶；3 个月后可驾驶到晚上 10 点。'],
    ['未满18岁练车', '通常需要至少 50 小时监督驾驶，其中至少 10 小时夜间。'],
    ['16 / 17 岁宵禁', '16 岁通常 11pm–6am 限制驾驶；17 岁通常 1am–5am 限制，工作或合格成人陪同等情况有例外。'],
    ['School Zone', 'Florida 标准 school zone 限速通常为 20 mph，实际以现场标志和启用时段为准。'],
    ['School Bus', '普通双向道路两侧车辆都要停车；真正被 5 ft+ 未铺装中间带、raised median 或实体 barrier 分隔时，对向车辆通常可谨慎继续。'],
    ['标准限速', 'Municipal / Business / Residential 通常 30 mph；Streets and Highways 55 mph；Limited Access Highways 70 mph。'],
  ]
  return <section className="bg-white py-10"><div className="page-shell"><div className="card p-5"><p className="text-sm font-bold text-teal-700">Florida FLHSMV 重点规则</p><h2 className="mt-2 text-2xl font-black text-slate-950">佛州 Class E 高频考点</h2><p className="mt-2 text-sm leading-6 text-slate-600">以下是学习说明，不把申请材料、费用或预约信息混入考题。题库只保留适合 Class E Knowledge Exam 练习的规则、标志和安全驾驶内容。</p><div className="mt-5 grid gap-3 md:grid-cols-2">{items.map(([title,text])=><div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="font-black text-slate-950">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>)}</div></div></div></section>
}
