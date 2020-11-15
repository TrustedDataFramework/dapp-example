/**
 * welfare example in assembly script
 */

import {
  Globals,
  ABI_DATA_TYPE,
  ___idof
} from '../../node_modules/@salaku/js-sdk/lib'
import {
  Store,
  RLP,
  RLPList,
  Transaction
} from '../../node_modules/@salaku/js-sdk/lib'
import { Context, Address, log } from '../../node_modules/@salaku/js-sdk/lib'

const ZERO_ADDRESS = new Address(new Uint8Array(20).buffer)

export function init(ownerAddress: Address): void {
  // 红十字会地址，二次确认地址
  Globals.set<Address>('owner', ownerAddress)
  log('公益合约已部署')
}

class DonorDB {
  static DONOR_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<
    ArrayBuffer,
    ArrayBuffer
  >('donor')

  getDonor(hash: ArrayBuffer): Donor {
    return Donor.fromEncoded(DonorDB.DONOR_DB.get(hash))
  }

  setDonor(hash: ArrayBuffer, u: Donor): void {
    DonorDB.DONOR_DB.set(hash, u.getEncoded())
  }
}

const donorDB = new DonorDB()

class Donor {
  // 捐赠姓名
  name: string
  // 捐赠内容
  content: string
  // 捐赠数量
  quantity: u64
  // 简介信息
  info: string
  // 捐赠地址
  address: Address
  // 受益人
  get: Address
  // 捐赠机构
  donor: string
  // 上链区块高度
  blockHeight: u64
  // 上链区块哈希值
  blockHash: ArrayBuffer
  // 上链事务哈希值
  txHash: ArrayBuffer
  // 上链时间戳
  timestamp: u64
  // 是否被确认
  confirmed: boolean
  // 确认事务的哈希值
  confirmHash: ArrayBuffer

  constructor(
    name: string,
    content: string,
    quantity: u64,
    info: string,
    address: Address,
    get: Address,
    donor: string,
    confirmed: boolean
  ) {
    this.name = name
    this.content = content
    this.quantity = quantity
    this.info = info
    this.address = address
    this.get = get
    this.donor = donor
    this.confirmed = confirmed
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Donor {
    const u = new Donor('', '', 0, '', ZERO_ADDRESS, ZERO_ADDRESS, '', false)
    const li = RLPList.fromEncoded(buf)
    u.name = li.getItem(0).string()
    u.content = li.getItem(1).string()
    u.quantity = li.getItem(2).u64()
    u.info = li.getItem(3).string()
    u.address = new Address(li.getItem(4).bytes())
    u.get = new Address(li.getItem(5).bytes())
    u.donor = li.getItem(6).string()
    u.confirmed = li.getItem(7).u8() != 0
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.name))
    els.push(RLP.encodeString(this.content))
    els.push(RLP.encodeU64(this.quantity))
    els.push(RLP.encodeString(this.info))
    els.push(RLP.encode<Address>(this.address))
    els.push(RLP.encode<Address>(this.get))
    els.push(RLP.encodeString(this.donor))
    els.push(RLP.encodeU64(this.confirmed ? 1 : 0))
    return RLP.encodeElements(els)
  }
}

// 保存捐赠人
export function saveDonor(
  name: string,
  content: string,
  quantity: u64,
  info: string,
  address: Address,
  get: Address,
  donor: string
): void {
  const msg = Context.msg()
  const transfor: Transaction = Context.transaction()
  const u = new Donor(name, content, quantity, info, address, get, donor, false)
  donorDB.setDonor(transfor.hash, u)
}

// 保存二次确认信息
export function saveConfirm(hash: ArrayBuffer): void {
  const msg = Context.msg()
  const u = donorDB.getDonor(hash)
  u.confirmed = true
  donorDB.setDonor(hash, u)
}

export function getDonorEncoded(hash: ArrayBuffer): ArrayBuffer {
  return DonorDB.DONOR_DB.get(hash)
}

// 读取捐赠人
export function getDonor(hash: ArrayBuffer): Address {
  return donorDB.getDonor(hash).address
}

// 读取捐赠姓名
export function getName(hash: ArrayBuffer): string {
  return donorDB.getDonor(hash).name
}

// 读取捐赠内容
export function getContent(hash: ArrayBuffer): string {
  return donorDB.getDonor(hash).content
}

// 读取捐赠数量
export function getQuantity(hash: ArrayBuffer): u64 {
  return donorDB.getDonor(hash).quantity
}

// 读取捐赠简介信息
export function getInfo(hash: ArrayBuffer): string {
  return donorDB.getDonor(hash).info
}

// 读取受益人
export function getGet(hash: ArrayBuffer): Address {
  return donorDB.getDonor(hash).get
}

// 读取二次确认信息
export function getConfirm(hash: ArrayBuffer): boolean {
  return donorDB.getDonor(hash).confirmed
}

export function __idof(type: ABI_DATA_TYPE): u32 {
  return ___idof(type)
}
