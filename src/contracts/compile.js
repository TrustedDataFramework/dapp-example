const path = require('path')
const child_process = require('child_process')
const CUR = path.resolve(__dirname)
const asc = path.join(CUR, '../../node_modules/.bin/asc')
const src = path.join(CUR, 'welfare.ts')
const { compileABI } = require('@salaku/js-sdk')
const fs = require('fs')

// 编译合约脚本
function main() {
  child_process.execSync(
    `${asc} ${src} -b ${path.relative(process.cwd(), path.join(CUR, 'welfare.wasm'))} --debug --sourceMap`
  )
  const abi = compileABI(fs.readFileSync(src))
  fs.writeFileSync(
    path.join(CUR, 'welfare.abi.json'),
    JSON.stringify(abi, null, 2)
  )
}

main()
