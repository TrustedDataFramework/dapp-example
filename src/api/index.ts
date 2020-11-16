import tool = require('@salaku/js-sdk')
import { rlp, bin2hex, hex2bin } from '@salaku/js-sdk'
import { rpc, PRIVATE_KEY, CONTRACT } from '@/api/constants'
import axios from 'axios'

async function syncNonce(
  bd: tool.TransactionBuilder
): Promise<tool.TransactionBuilder> {
  const addr = tool.publicKey2Address(tool.privateKey2PublicKey(bd.sk))
  const n = await rpc.getNonce(addr)
  let nn = typeof n === 'string' ? parseInt(n) : n
  bd.nonce = (nn + 1).toString()
  return bd
}


export function emptyDonor(): DonorPayload {
  return {
    name: '',
    content: '',
    quantity: null,
    info: '',
    address: '',
    get: '',
    donor: '',
    confirmed: false
  }
}

export interface DonorPayload {
  // 捐赠姓名
  name?: string
  // 捐赠内容
  content?: string
  // 捐赠数量
  quantity?: number
  // 简介信息
  info?: string
  // 捐赠地址
  address?: string
  // 受益人
  get?: string
  // 捐赠机构
  donor?: string
  // 上链高度
  height?: number
  // 上链事务的哈希值
  hash?: string
  // 上链事务的时间戳
  timestamp?: number
  // 是否被确认
  confirmed?: boolean
  // 确认事务的哈希值
  confirmHash?: string
}

export interface ConfirmPayload {
  // 捐赠说明
  description?: string
  // 时间戳
  timestamp?: number
  // 区块高度
  height?: number
  // 事务哈希
  hash?: string
}

// 发送合约捐赠事务
export async function saveDonor(payload: DonorPayload): Promise<string> {
  let builder = new tool.TransactionBuilder(
    tool.constants.POA_VERSION,
    PRIVATE_KEY
  )
  builder = await syncNonce(builder)
  const tx = builder.buildContractCall(CONTRACT, 'saveDonor', <any>payload, 0)
  await rpc.sendAndObserve(tx, tool.TX_STATUS.INCLUDED)
  const h = tx.getHash()
  localStorage.setItem('txHash', h)
  return h
}

export async function getConfirm(): Promise<ConfirmPayload> {
  const d = await getDonor()
  if (!d || !d.confirmed) return null
  const r = hex2bin(
    <string>await rpc.viewContract(CONTRACT, 'getConfirmEncoded', d.confirmHash)
  )
  return decodeConfirm(r)
}

export async function getDonor(): Promise<DonorPayload> {
  const h = localStorage.getItem('txHash')
  if (!h) return null
  const r = hex2bin(
    <string>await rpc.viewContract(CONTRACT, 'getDonorEncoded', h)
  )
  return decodeDonor(r)
}

function decodeDonor(buf: Uint8Array): DonorPayload {
  const u = <DonorPayload>{}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.content = rd.string()
  u.quantity = rd.number()
  u.info = rd.string()
  u.address = bin2hex(rd.bytes())
  u.get = bin2hex(rd.bytes())
  u.donor = rd.string()
  u.height = rd.number()
  u.hash = bin2hex(rd.bytes())
  u.timestamp = rd.number()
  u.confirmed = rd.bool()
  u.confirmHash = bin2hex(rd.bytes())
  return u
}

function decodeConfirm(buf: Uint8Array): ConfirmPayload {
  const r = <ConfirmPayload>{}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  r.description = rd.string()
  r.timestamp = rd.number()
  r.height = rd.number()
  r.hash = bin2hex(rd.bytes())
  return r
}

export function reset(): void{
  localStorage.removeItem('txHash')
}

export async function getHashByHeight(height: number): Promise<string>{
  const r = await axios.get(`/rpc/block/${height}`)
  return r.data.data.hash
}