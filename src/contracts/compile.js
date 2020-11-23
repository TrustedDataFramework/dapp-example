#!/usr/bin/env node

const path = require('path')
const child_process = require('child_process')
const fs = require('fs')
let src = process.env['ENTRY'] || path.join(__dirname, 'welfare.ts')
const { compileABI } = require('@salaku/js-sdk')

src = path.relative(process.cwd(), src)

const dst = src.replace(/^(.*)\.ts$/, '$1.wasm')
let abort = '../../node_modules/@salaku/js-sdk/lib/prelude/abort'
abort = path.relative(process.cwd(), path.join(__dirname, abort))
const abiDist = src.replace(/^(.*)\.ts$/, '$1.abi.json')

const cmd = `asc ${src} -b ${dst} --runtime none --use abort=${abort} --sourceMap --debug`
const abi = compileABI(fs.readFileSync(src))
fs.writeFileSync(abiDist, JSON.stringify(abi, null, 2))
console.log(cmd)

child_process.execSync(cmd)