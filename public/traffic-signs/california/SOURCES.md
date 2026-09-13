# California traffic-sign assets

本目录用于 OpenAA DMV California 题库。原则：题目只按 `question.id` 固定绑定资源；不根据题目文字自动猜图。

## 标准与许可

- California 使用 CA MUTCD；联邦标准代码的交通标志设计以 FHWA MUTCD / Standard Highway Signs 为依据。
- MUTCD 交通控制设施设计属于 public domain。这里保存的是 MUTCD 标准设计的本地 SVG 副本，避免运行时依赖外部图片地址。
- 资源在加入前均核对了 MUTCD 标志代码及公开来源；部分 SVG 通过公开的 PD-MUTCD 镜像取得，设计来源仍为 FHWA/MUTCD。

## 当前本地资源

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

校验/镜像来源包括 Wikimedia Commons 的 PD-MUTCD 文件说明以及公开 GitHub 镜像 `JoeFerrara/street-sign-studio`、`johnbr0phy/driving-test-app`、`animeshkundu/dmv-prep`。这些镜像的 manifest/downloader 将对应文件明确映射到相同的 MUTCD 标志代码。

## 有意不配图的题

以下题型当前不会用“近似图”顶替；只有拿到可以直接对应题意的官方图表后才会加入：

- 绿色导向牌类别：计划补 D1 系列官方标准示例。
- 棕色休闲/文化类别：计划补 MUTCD Part 2M / RS 系列官方标准示例。
- 红、白、蓝路缘：这是 California 停车/路缘规则，不是单一 MUTCD 交通标志。
- `ONLY` 路面箭头、黄实/虚线、宽双黄线：属于 pavement markings，计划使用 MUTCD Part 3 / California 官方图表，不使用交通标志 SVG 代替。
