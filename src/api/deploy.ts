import { vm, ADDRESS, persistVM, PRIVATE_KEY, getABI, getContractBin } from '@/api/constants'
import { ENV, rpc } from './constants'
import { TransactionBuilder, constants, Contract, TX_STATUS } from '@salaku/js-sdk'

import wasm from '@/contracts/welfare.wasm'


// 部署公益合约
export async function deployOnce() {
  const abi = await getABI()
  const buf = await getContractBin()

  // 生产环境部署到链上
  if (ENV === 'prod') {
    const n = await rpc
      .getNonce(ADDRESS)
      .then((r) => (typeof r === 'string' ? parseInt(r) : r))
    if (n >= 1) return
    const bd = new TransactionBuilder(constants.POA_VERSION, PRIVATE_KEY)
    bd.nonce = '1'
    const c = new Contract('', abi, buf)
    const tx = bd.buildDeploy(c, ADDRESS)
    return rpc.sendAndObserve(tx, TX_STATUS.INCLUDED)
  }

  const n = vm.nonceMap.get(ADDRESS)
  if (n >= 1)
    return
  await vm.deploy(ADDRESS, wasm, ADDRESS)
  persistVM()
}
