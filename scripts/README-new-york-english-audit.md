# 纽约英文审计

纽约中文源与稳定ID保持独立，英文内容通过语言层映射。实际审计逻辑位于[lib/new-york-english-audit.ts](../lib/new-york-english-audit.ts)。

从仓库根目录执行`npm ci`后：

```sh
npm test
```

当前回归已经调用`auditNewYorkEnglish()`并验证150/150覆盖、选项结构及题干唯一性，也验证纽约独立组卷与双重通过条件。只查看审计输出时可使用现有TypeScript加载器：

```sh
node --input-type=module -e "import { require } from './scripts/register-typescript.mjs'; require('@/scripts/audit-new-york-english.ts')"
```

加载器使用仓库的TypeScript开发依赖；不要将该命令描述为完全不依赖开发工具，也不要假设Node能直接解析脚本中所有无扩展名的TypeScript import。

覆盖率/结构检查通过不证明翻译语义、答案和官方规则都正确。修改中文、选项或图示后仍需检查英文对齐、正确答案位置与解释。`docs/`中的纽约英文文档含早期内容状态，应以当前源文件和回归结果为准，不把历史重复题描述自动当成当前问题。
