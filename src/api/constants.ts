import { ABI, VirtualMachine, RPC, publicKey2Address, privateKey2PublicKey, Contract, hex2bin, bin2hex} from '@salaku/js-sdk'
import abi from '@/contracts/welfare.abi.json'
import axios from 'axios'

import wasm from '@/contracts/welfare.wasm'

let abiCache

export async function getABI(): Promise<ABI[]>{
  if (abiCache)
    return abiCache
  abiCache = await axios.get(<any> abi).then(r =>r.data)
  return abiCache
}

// dev 环境下使用假节点
export const ENV: 'dev' | 'prod' = localStorage.getItem('env') === 'dev' ? 'dev' : 'prod'

export async function getContractBin(): Promise<Uint8Array>{
  const r = await fetch(wasm)
  return new Uint8Array(await r.arrayBuffer())
}

export const vm = (function(){
  const data = localStorage.getItem('vm')
  if(!data)
    return new VirtualMachine()
  // @ts-ignore  

  return VirtualMachine.fromDump(hex2bin(data).buffer)  
})()

export function persistVM(){
  localStorage.setItem('vm', bin2hex(vm.dump()))
}

export const rpc = new RPC(location.hostname, '7010')
export const CONTRACT_ADDRESS = '664ac90d498a460accf9feee8994d93981998c1b'

export async function getContract() {
  return new Contract(CONTRACT_ADDRESS, await getABI())
}

// 捐赠人的私钥
export const PRIVATE_KEY =
  'f00df601a78147ffe0b84de1dffbebed2a6ea965becd5d0bd7faf54f1f29c6b5'

// 捐赠人的地址
export const ADDRESS = publicKey2Address(
  privateKey2PublicKey(PRIVATE_KEY)
)

// 红十字会的私钥
export const CROSS_PRIAVTE_KEY =
  'b8bcde6ea12982ff341cef358040584e0b397b51beaf0b11a45f80be9b5dfe33'
