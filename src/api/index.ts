import tool = require('@salaku/js-sdk')
import { rlp, bin2hex, hex2bin } from '@salaku/js-sdk'
import { rpc, PRIVATE_KEY, CONTRACT, CROSS_PRIAVTE_KEY } from '@/api/constants'
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

export function formatDate(d: Date, fmt: string) {
  const o = {
      "M+": d.getMonth() + 1,                 //月份
      "d+": d.getDate(),                    //日
      "h+": d.getHours(),                   //小时
      "m+": d.getMinutes(),                 //分
      "s+": d.getSeconds(),                 //秒
      "q+": Math.floor((d.getMonth() + 3) / 3), //季度
      "S": d.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt
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
    height: null,
    hash: '',
    timestamp: null,
    confirmed: false,
    confirmHash: ''
  }
}

export function emptyConfirm(): ConfirmPayload{
  return {
    description: '',
    timestamp: null,
    height: null,
    hash: ''
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

// 发送确认事务
export async function saveConfirm(description: string): Promise<string> {
  let bd = new tool.TransactionBuilder(
    tool.constants.POA_VERSION,
    CROSS_PRIAVTE_KEY
  )
  bd = await syncNonce(bd)
  const tx = bd.buildContractCall(CONTRACT, 'saveConfirm', {
    hash: localStorage.getItem('txHash'),
    description: description
  })
  await rpc.sendAndObserve(tx, tool.TX_STATUS.INCLUDED)
  return tx.getHash()
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

export function reset(): void {
  localStorage.removeItem('txHash')
}

export async function getHashByHeight(height: number): Promise<string> {
  const r = await axios.get(`/rpc/block/${height}`)
  return r.data.data.hash
}
