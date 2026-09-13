# California traffic-sign and marking assets

本目录用于 OpenAA DMV California 题库。原则：题目只按 `question.id` 固定绑定本地资源；禁止根据题目文字自动猜图。

## 标准与许可

- California 使用 CA MUTCD；联邦标准代码的交通标志设计以 FHWA MUTCD / Standard Highway Signs 为依据。
- CA MUTCD 2026 自 2026-01-18 起生效；Part 2 涵盖交通标志，Part 3 涵盖路面与路缘标线。
- MUTCD / CA MUTCD 的交通控制设施设计和图表可用于学习与再发布；本站将资源保存在 `public/traffic-signs/california`，运行时不依赖 DMV、Caltrans 或 FHWA 外链图片。
- 标准交通标志使用已核对 MUTCD 代码的本地 SVG；Part 2M 类别示例与 Part 3 路缘/路面标线使用按官方图表和规则制作的本地学习图，并在界面中明确标出来源章节/图号。

## 标准交通标志本地资源

| 本地文件 | MUTCD 代码 | 用途 | 来源/核对 |
| --- | --- | --- | --- |
| `r1-1-stop.svg` | R1-1 | STOP | FHWA/MUTCD public-domain vector |
| `r1-2-yield.svg` | R1-2 | YIELD | FHWA/MUTCD public-domain vector |
| `r2-1-speed-limit.svg` | R2-1 | SPEED LIMIT 法规标志示例 | FHWA/MUTCD public-domain vector |
| `r3-4-no-u-turn.svg` | R3-4 | NO U-TURN | FHWA/MUTCD public-domain vector |
| `r5-1-do-not-enter.svg` | R5-1 | DO NOT ENTER | FHWA/MUTCD public-domain vector |
| `r5-1a-wrong-way.svg` | R5-1a | WRONG WAY | FHWA/MUTCD public-domain vector |
| `r15-1-crossbuck.svg` | R15-1 | Grade Crossing Crossbuck | FHWA/MUTCD public-domain vector |
| `w10-1-railroad-warning.svg` | W10-1 | Railroad Advance Warning | FHWA/MUTCD public-domain vector |
| `s1-1-school.svg` | S1-1 | School | FHWA/MUTCD public-domain vector |
| `w1-2-curve.svg` | W1-2 | Curve | FHWA/MUTCD public-domain vector |
| `cw20-1-road-work.svg` | CW20-1 | Road Work | FHWA/MUTCD public-domain vector |
| `d9-2-hospital.svg` | D9-2 | Hospital / blue service sign example | FHWA/MUTCD public-domain vector |

历史校验/镜像来源包括 Wikimedia Commons 的 PD-MUTCD 文件说明以及公开 GitHub 镜像 `JoeFerrara/street-sign-studio`、`johnbr0phy/driving-test-app`、`animeshkundu/dmv-prep`。这些镜像的 manifest/downloader 将对应文件映射到相同 MUTCD 标志代码。

## 本次新增：Guide / Part 2M / Part 3 本地学习图

| 本地文件 | 对应标准 | 用途 |
| --- | --- | --- |
| `d1-guide-example.svg` | MUTCD Chapter 2D，D1 导向标志类别 | 绿色导向牌类别题 |
| `figure-2m-2-recreation-guide.svg` | CA MUTCD 2026 Figure 2M-2 | 棕色休闲/文化兴趣地点类别题 |
| `ca-curb-red.svg` | CA MUTCD 2026 Part 3B + California DMV curb rules | 红色路缘题 |
| `ca-curb-white.svg` | CA MUTCD 2026 Part 3B + California DMV curb rules | 白色路缘题 |
| `ca-curb-blue.svg` | CA MUTCD 2026 Part 3B + California DMV curb rules | 蓝色路缘题 |
| `figure-3b-only-arrow.svg` | CA MUTCD 2026 Part 3B / MUTCD pavement markings | ONLY + 箭头路面标线题 |
| `figure-3b-yellow-center-lines.svg` | CA MUTCD 2026 Part 3B / MUTCD Figure 3B center-line conventions | 黄实线/黄虚线题 |
| `ca-wide-double-yellow.svg` | California DMV + CA MUTCD 2026 Part 3B | 相隔较宽双黄线题 |

注意：上表 Part 2M / Part 3 文件是为了在题目卡片中清楚呈现官方规则而制作的本地 SVG 学习图，并不是从官方 PDF 截下来的像素截图；内容、配色、线型和语义按 CA MUTCD 2026 / FHWA MUTCD 对应章节核对。这样既不会依赖外部图片地址，也避免把不相关的交通标志硬套到路缘或路面标线题上。

## 当前映射状态

California 现有 `signs` 类题目全部通过固定 `question.id` 映射到本地资源；此前 11 个 `null` 已补齐：

- 绿色导向类别：`signs-007`、`ca-signs-008`、`ca2-signs-006`
- 棕色休闲/文化类别：`ca-signs-010`、`ca2-signs-008`
- 路缘：`ca2-signs-012` ~ `014`
- 路面标线：`ca2-signs-015` ~ `017`

官方参考：
- Caltrans CA MUTCD 2026：Part 2D、Part 2M、Part 3B
- FHWA MUTCD 11th Edition / Standard Highway Signs and Markings
- California DMV Driver's Handbook（curb colors / pavement markings）
