# OpenAA DMV · 美国驾照学习平台

[dmv.openaa.com](https://dmv.openaa.com) 是 OpenAA 的 DMV 学习站，提供按州组织的中文、English、中英对照题库、练习、模拟考试、交通标志、错题复习和办事指南。[OpenAA 主站](https://openaa.com) 是独立应用；本仓库是 `openaa-dmv`，不要与 `openaa-app` 的路由、题库、凭据和部署混用。

本说明依据当前代码。题目、题量、分数与语言设置描述的是**本站实现**，不代表官方真题或对各州政策的实时核验；正式要求应以对应州官方机构、手册及考试当天规定为准。

## 1. 架构与运行要求

| 项目 | 当前实现 |
| --- | --- |
| 应用 | Next.js 16 App Router、React 19、TypeScript、Tailwind CSS 4 |
| 数据 | 仓库内的 TypeScript / JSON 静态题库，无运行时题库数据库 |
| 学习记录 | 浏览器 localStorage，按州隔离；不可用时回退为内存记录 |
| 登录 | 本仓库没有用户登录、云同步或题库管理后台；学习无需登录 |
| 部署 | Next.js 应用，通过 Vercel 配置部署；不是 `output: 'export'` 的静态导出项目 |
| PWA | manifest、桌面安装引导、service worker及同源资源缓存 |
| 检查 | ESLint、Node回归脚本、Next.js构建；另有本地Playwright浏览器回归 |

建议使用 Node.js 22 与 npm。实际版本范围见 [package.json](package.json)，可重复安装版本以 [package-lock.json](package-lock.json) 为准。本仓库没有 `.github/workflows`，不能把 `npm run check` 描述为已经自动执行的 GitHub CI。

## 2. 本地安装与启动

在终端执行：

```sh
git clone https://github.com/alititi-jackie/openaa-dmv.git
cd openaa-dmv
npm ci
npm run dev
```

打开 `http://localhost:3000`。项目不需要 Supabase、数据库迁移或主站 service-role key。

如本机环境无法枚举网卡，可显式绑定回环地址：

```sh
npm run dev -- --hostname 127.0.0.1
```

需要环境文件时可以复制模板：

```sh
# macOS / Linux / Git Bash
cp .env.example .env.local
```

```powershell
# Windows PowerShell，复制命令二选一
Copy-Item .env.example .env.local
```

**域名配置的实际行为：**[lib/site.ts](lib/site.ts) 将 `SITE_URL` 固定为 `https://dmv.openaa.com`。`.env.example` 虽保留 `NEXT_PUBLIC_SITE_URL`，当前主域逻辑并不读取它；单改环境变量不会改变canonical、sitemap或结构化数据。localhost可以正常开发，但生成的SEO绝对地址仍指向生产主域。修改主域必须审查共用常量及测试，不要靠添加主站凭据解决。

## 3. 主要页面与纽约入口

| 路由 | 功能 |
| --- | --- |
| `/` | 选州、学习入口与生态链接 |
| `/california`、`/new-jersey`、`/pennsylvania`、`/massachusetts`、`/washington`、`/texas`、`/florida` | 当前七个通用架构州的首页 |
| `/<州>/questions` | 分类题库 |
| `/<州>/practice` | 默认随机练习，可切换顺序 |
| `/<州>/mock-test` | 按州配置模拟考试；加州有模式选择 |
| `/<州>/signs` | 从该州题库派生的标志专项 |
| `/<州>/wrong-questions` | 当前浏览器内的该州错题 |
| `/<州>/guide` | 州办事指南 |
| `/ny`及上述六类学习子路由 | 本站独立纽约学习体验 |
| `/new-york` | 跳转到主站 `https://openaa.com/dmv`，不是 `/ny` 的别名 |
| `/dmv` | 历史入口，跳转到本站 `/` |
| `/guide`、`/about` | 综合指南与站点说明 |
| `/dmv-hours`、`/driving-test`、`/practice-test`、`/traffic-signs`、`/road-test`、`/chinese-license`、`/real-id` | 主题学习/指南入口 |
| `/<州>/<seoSlug>`、`/ny/<seoSlug>` | 已定义的SEO文章；不是任意slug都存在 |
| `/robots.txt`、`/sitemap.xml`、`/manifest.webmanifest`、`/sw.js` | SEO和PWA资源 |

特别注意：`dmvStates` 中纽约仍标记为 `external`，但 `/ny` 有显式页面和独立题库。因此“筛选所有live州”不会自动包含纽约。修改选州、导航、sitemap或测试时，应同时核查主站纽约入口与本站 `/ny` 入口，不能笼统地将所有纽约流量重定向。

## 4. 题库与模拟考试配置

以下是当前代码与回归脚本约束的题库规模和练习设置。题库更新后要同步检查此表，不要把练习配置转写为未经核实的官方承诺。

| 州 / 路径 | 题库数量 | 本站模拟考试设置 |
| --- | ---: | --- |
| 纽约 `/ny` | 150 | 20题，其中4题标志；总正确≥14且标志正确≥2 |
| 加州 `/california` | 263 | 36题或46题学习模式，80%学习目标 |
| 新泽西 `/new-jersey` | 188 | 50题，正确≥40 |
| 宾州 `/pennsylvania` | 187 | 18题，正确≥15 |
| 麻州 `/massachusetts` | 195 | 25题，25分钟，正确≥18 |
| 华盛顿州 `/washington` | 190 | 40题，正确≥32 |
| 德州 `/texas` | 180 | 30题练习模式，70%评分线 |
| 佛州 `/florida` | 197 | 50题练习，40题/80%学习线，60分钟模拟倒计时 |

加州、德州和佛州配置含 `ruleStatus: 'practice'`，说明中明确区分本站练习与正式考试。其它配置中的 `verified` 也只是维护标签，并不自动随官方政策更新。题量、及格标准、时限、费用和语言变化均需重新核实来源。

语言模式为 `zh`、`en`、`bilingual`，但不意味着每个页面或正式考试都提供三种语言：德州、佛州模拟考试当前只提供English和中英对照，默认English；中文学习可使用题库和普通练习。页面限制与提醒见 [state-page-config.ts](lib/state-page-config.ts)，不要为统一UI而移除州差异。

### 纽约必须保持独立

- 中文源：[data/new-york/openaa-ny-dmv-questions-v1.json](data/new-york/openaa-ny-dmv-questions-v1.json)。
- 映射：[new-york-questions.ts](lib/new-york-questions.ts)；读取入口：[new-york-bank.ts](lib/new-york-bank.ts)。
- 英文：[new-york-english.ts](lib/new-york-english.ts)，由共用语言层展示。
- 组卷与双重通过条件：[new-york-engine.ts](lib/exam/new-york-engine.ts)。
- 稳定ID为 `ny-openaa-1`—`ny-openaa-150`；组卷按概念和题干去重，不能混入Shared Core或改用通用百分比通过判断。

`getStateQuestions('ny'/'new-york')`和通用考试配置会明确拒绝纽约别名。当前回归要求纽约150个稳定ID全部有英文、选项数量对应，并多种种子验证每卷恰有4题标志。历史纽约设计/审计文档可能记录较早题库状态，以当前源文件和运行结果为准。

### 其它州的组合路径

`state-question-bank.ts`组合公共核心与州专属题，并处理去重/过滤；加州还有自己的扩展与英文映射。不要把组合逻辑简化成所有州共享同一套题和同一套组卷规则。关键文件：

- [question-bank.ts](lib/question-bank.ts)、[shared-core-bank.ts](lib/shared-core-bank.ts)。
- [state-question-bank.ts](lib/state-question-bank.ts)、[state-architecture.ts](lib/state-architecture.ts)。
- [exam-config.ts](lib/exam/exam-config.ts)、[exam-engine.ts](lib/exam/exam-engine.ts)。
- [dmv-language.ts](lib/dmv-language.ts)：英文选择与选项对齐，不能仅按相同ID误套其它州的图片变体。

## 5. 目录与维护入口

| 路径 | 职责 |
| --- | --- |
| `app/` | 首页、州页面、显式纽约路由、主题指南、SEO文章与metadata |
| `components/` | 练习、题库、语言、导航、安装/分享等UI |
| `components/exam/` | 各州共用考试UI；不代表题库和判分规则相同 |
| `lib/*questions*.ts`、`lib/*english*.ts` | 各州题库、补充题与英文映射 |
| `lib/exam/` | 考试配置、组卷、类型、随机种子和记录键 |
| `lib/browser-storage.ts` | 本地存储容错、旧成绩兼容 |
| `lib/*seo-content.ts` | 各州SEO文章 |
| `lib/sign-library.ts`、`lib/sign-visuals.ts` | 标志资源与稳定ID映射 |
| `data/new-york/` | 独立纽约JSON题源 |
| `public/traffic-signs/` | 本地SVG标志和学习图 |
| `scripts/` | 回归检查、TypeScript加载器、纽约英文审计 |
| `docs/` | 纽约英文实施、历史审查及发布记录 |
| `next.config.js`、`vercel.json` | 框架及部署配置 |

## 6. 更新题目、英文和图片

1. 找到该州的实际题源；纽约与其它州分开维护，先检查组合入口，不能只修改看似同名的文件。
2. 保留已有稳定ID；新增题目检查唯一ID、概念、题干、答案索引、解释和类别。变更题目意义时要考虑旧错题/收藏记录如何处理。
3. 修改中文选项或顺序时，同步核对英文选项与正确答案位置。不能只看到150/150覆盖就认定译文和答案语义正确。
4. 标志题按固定 `question.id` 映射资源，不按关键词猜图。维护alt、代码、来源及所需本地SVG；专项页面从州题库派生，不另建不一致的标志题源。
5. 调整题库数量、类别配额、考试模式后，同步核对 `scripts/test.mjs` 中的断言；只能在审查过内容变化后更新预期，不能为通过测试盲改数字。
6. 运行回归与构建，必要时进行本地浏览器测试；人工检查中英一致、图片语义、移动端和来源。

图片来源记录见 [SOURCES.md](public/traffic-signs/california/SOURCES.md)。仓库有 [MIT LICENSE](LICENSE)，资源维护仍应逐项检查来源记录，不能用代码许可证替代素材来源说明。站点验证文件、审计资源和历史文档即使未被页面import，也不能据此认定无用并删除。

## 7. 学习记录与考试中断

记录属于**当前浏览器和当前站点origin**，不会同步到OpenAA主站、其它设备或浏览器。清理网站数据、换设备或使用隐私模式，都可能丢失记录。

主要键由 [exam-storage.ts](lib/exam/exam-storage.ts) 定义，以`openaa-dmv:<state>:`开头，例如：

| 后缀 | 用途 |
| --- | --- |
| `wrong` | 错题ID |
| `exam:last-score` | 最近一次正式模拟提交的成绩 |
| `language` | 语言选择 |
| `answered` / `correct` / `mastered` / `favorites` | 练习与掌握/收藏相关记录 |
| `exam:resume` | 旧版中断记录键，仅兼容清理用途，不是当前续考功能 |

成绩读取会兼容旧的`wrong:last-mock-score`、`last-score`键，不应擅自删除旧数据或更改州命名。纽约学习路由使用`ny`命名空间，不要直接改成`new-york`导致既有记录无法读取。

未提交考试的答案只存在内存中；刷新、离开或关闭页面会放弃当前试卷。已提交的成绩和错题仍可保存；错题复习不应覆盖完整模拟考试的原成绩。通用模拟页打开时会清理旧的续考记录。

localStorage被禁用、容量不足或数据异常时，存储封装避免中断学习，并可显示提示；内存回退不保证跨刷新保留数据。此行为不等同于云端备份。

## 8. PWA、离线缓存与统计

`ServiceWorkerRegister`注册`/sw.js`；安装按钮优先使用浏览器安装能力，不支持时显示操作提示。iPhone/iPad等浏览器的安装行为与Chrome不同，不能承诺点击按钮就会自动安装。

当前service worker实际实现：

- 安装时预缓存首页、manifest与图标等应用壳。
- `/_next/static/`和本地图片采用cache-first。
- 页面导航network-first，断网时优先返回缓存页，再回退首页。
- 其它同源GET采用stale-while-revalidate；跨域请求不由此worker接管。

因此可以利用**已缓存页面和资源**继续部分离线学习，但不保证首次离线访问或所有州、所有页面都已下载。题库随JS包发布；离线可用取决于对应页面、JS和图片是否实际缓存。外部官方链接、跨域资源及统计仍依赖网络。

更新同路径图片或缓存策略时，要检查并适当更新`CACHE_VERSION`，用新旧浏览器会话验证升级。当前代码不会预下载整站，也没有在浏览器回归脚本中完整验证离线缓存生命周期。不要重复旧README中“完全不缓存题库”的说明，也不要反向承诺“全站永久离线”。

`app/layout.tsx`加载主站的`https://openaa.com/analytics/tracker.js`。DMV仓库本身没有统计数据库和管理后台；采集SDK、接收端和统计展示由对应主站实现维护。离线或脚本加载失败时，统计可能缺失，不能用它证明所有访问。

## 9. 检查命令

```sh
npm run lint
npm test
npm run build
# 或执行以上三项的串行组合：
npm run check
```

- `npm test`验证题库数量、ID与中英结构、各州组卷/判分、纽约独立架构、本地存储容错、成绩兼容、部分组件渲染和JSON-LD安全等。
- `npm run build`执行Next.js生产构建并检查TypeScript；当前没有独立的`typecheck`脚本。
- `npm run check`**不包含**浏览器回归、依赖安全审计、正式规则人工核实或线上部署验收。
- 依赖安全另运行`npm audit`或`npm audit --omit=dev`。主站曾经通过的检查不能代替本仓库检查，也不代表本仓库已同步升级依赖。

### 本地浏览器回归

先安装测试浏览器、构建并启动本地生产服务：

```sh
npx playwright install chromium
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

保持服务运行，在第二个终端执行：

```sh
npm run test:browser
```

默认测试地址为`http://127.0.0.1:3100`，可通过`TEST_BASE_URL`改为其它localhost/127.0.0.1端口；脚本会拒绝非本地主机。`TEST_CHROMIUM_PATH`可指向已安装的兼容Chromium。安装系统级浏览器依赖取决于所在环境权限，已有依赖不代表已下载浏览器。

脚本使用隔离浏览器上下文，覆盖模拟提交/错题、考试中断、倒计时、跨州记录隔离、存储被禁用，以及桌面/手机学习页面布局。不要拿它操作真实用户的浏览器记录或直接改成生产URL。Node回归、浏览器回归和人工核实是不同验证层次，文档列出命令不代表该环境已执行通过。

## 10. 部署与发布验收

1. 确认Vercel项目关联`alititi-jackie/openaa-dmv`，不是`openaa-app`。具体生产分支、域名和平台设置以Vercel项目为准。
2. 审查题库、路由、缓存和依赖变化，运行相应检查；需要手机或交互验证时执行浏览器回归。
3. 当前`vercel.json`声明`npm install`、`npm run build`、`npm run dev`。本地推荐`npm ci`保证锁文件安装，但不能据README假称平台已改为`npm ci`。
4. 绑定`dmv.openaa.com`并核验部署对应的commit、生产别名和页面。环境变量模板不会覆盖代码固定主域。
5. 检查首页选州、七州及`/ny`学习页面，核对纽约两种入口、模拟考试规则/语言、成绩与错题、图片、分享及安装提示。
6. 检查`/robots.txt`、`/sitemap.xml`、canonical和JSON-LD，避免误指`ny.openaa.com`或其它退役主域。
7. 对缓存/资源更新，在曾访问过旧版本的浏览器中验证，而不只测试全新无缓存会话。

回滚优先使用撤回提交或Vercel已有部署，保留历史。客户端缓存和localStorage不因代码回滚自动恢复：分别检查缓存版本、稳定题目ID和旧成绩键的兼容性。不要为排查问题直接清空真实用户的学习记录。

## 11. 常见问题与文档维护

| 现象 | 排查入口 |
| --- | --- |
| 修改环境变量后canonical仍不变 | `lib/site.ts`的固定`SITE_URL` |
| 纽约题库/考试异常 | 确认`/ny`显式路由、独立题源和`new-york-engine.ts`，不要套用通用配置 |
| 答案中英文不对应 | 中文选项顺序、英文映射及`dmv-language.ts`的对齐逻辑 |
| 标志图显示错误 | 稳定ID映射、SVG资源、来源说明；不能依赖关键词猜图 |
| 学习记录不见了 | origin、州slug、旧成绩键、隐私/清理设置及StorageNotice |
| 刷新后考试重新开始 | 当前设计不保存未提交的试卷，不能误报成续考故障 |
| 发布后仍看到旧图片或断网页面 | service worker缓存、`CACHE_VERSION`、访问历史与资源是否缓存 |
| 浏览器回归启动失败 | 本地服务端口、Chromium安装、`TEST_CHROMIUM_PATH`及系统依赖 |

更多说明：[考试架构](components/exam/README.md)、[纽约英文审计](scripts/README-new-york-english-audit.md)、[标志来源](public/traffic-signs/california/SOURCES.md)。`docs/new-york-english-*.md`包含历史实施/审查记录，不能自动当作当前待办或当前题库状态。

变更题库、州路由、语言、考试规则、存储键、缓存、命令和部署设置时，同步更新README及相关说明。涉及规则的内容补充官方来源和核实时间，明确哪些是本站学习设置，避免把“题库完整”写成“官方全量真题”或“保证通过”。
