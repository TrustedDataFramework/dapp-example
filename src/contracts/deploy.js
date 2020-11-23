const { TransactionBuilder, RPC, Contract, constants, privateKey2PublicKey, publicKey2Address, TX_STATUS} = require('@salaku/js-sdk')
const fs = require('fs')
const path = require('path')
const PRIVATE_KEY = 'f00df601a78147ffe0b84de1dffbebed2a6ea965becd5d0bd7faf54f1f29c6b5'
const PUBLIC_KEY = privateKey2PublicKey(PRIVATE_KEY)
const rpc = new RPC('192.168.1.52', 7010)

async function main(){
    const c = new Contract('', require('./welfare.abi.json'), fs.readFileSync(path.join(__dirname, 'welfare.wasm')))
    const bd = new TransactionBuilder(constants.POA_VERSION, PRIVATE_KEY, 0, 0, 0)
    bd.nonce = BigInt(await rpc.getNonce(PUBLIC_KEY)) + 1n
    const tx = bd.buildDeploy(c, publicKey2Address(PUBLIC_KEY))
    console.log(await rpc.sendAndObserve(tx, TX_STATUS.PENDING))
}

main().catch(console.error)
// rpc.getBlock(1).then(console.log)
