import fs from 'node:fs'
import path from 'node:path'
import Module, { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

export const root = fileURLToPath(new URL('../', import.meta.url))
export const require = createRequire(import.meta.url)
const resolveFilename = Module._resolveFilename
Module._resolveFilename = function (specifier, ...args) {
  return resolveFilename.call(this, specifier.startsWith('@/') ? path.join(root, specifier.slice(2)) : specifier, ...args)
}
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const source = fs.readFileSync(filename, 'utf8')
    const { outputText } = ts.transpileModule(source, { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    } })
    module._compile(outputText, filename)
  }
}
