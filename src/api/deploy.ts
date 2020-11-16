import { rpc, ADDRESS, PRIVATE_KEY } from '@/api/constants'
import {
  TransactionBuilder,
  constants,
  Contract,
  TX_STATUS
} from '@salaku/js-sdk'
import buf = require('@/contracts/welfare.wasm')
import abi = require('@/contracts/welfare.abi.json')

// 部署公益合约
export async function deployOnce() {
  const n = await rpc
    .getNonce(ADDRESS)
    .then((r) => (typeof r === 'string' ? parseInt(r) : r))
  console.log(n)
  if (n >= 1) return
  const bd = new TransactionBuilder(constants.POA_VERSION, PRIVATE_KEY)
  bd.nonce = '1'
  const c = new Contract('', abi, buf)
  const tx = bd.buildDeploy(c, ADDRESS)
  return rpc.sendAndObserve(tx, TX_STATUS.INCLUDED)
}
