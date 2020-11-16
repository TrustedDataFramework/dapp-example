/**
 * welfare example in assembly script
 */

import {
  Globals,
  ABI_DATA_TYPE,
  ___idof
} from '../../node_modules/@salaku/js-sdk/lib'
import { Store, Transaction } from '../../node_modules/@salaku/js-sdk/lib'
import { Context, Address, log } from '../../node_modules/@salaku/js-sdk/lib'
import { Donor, ZERO_HASH, Confirm } from './types'

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

const confirmDB = Store.from<ArrayBuffer, ArrayBuffer>('confirm')

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
  const tx = Context.transaction()
  const transfor: Transaction = Context.transaction()
  const u = new Donor(name, content, quantity, info, address, get, donor)
  const b = Context.header()
  u.blockHeight = b.height
  u.txHash = tx.hash
  u.timestamp = b.createdAt
  u.confirmHash = ZERO_HASH
  donorDB.setDonor(transfor.hash, u)
}

// 保存二次确认信息
export function saveConfirm(hash: ArrayBuffer, description: string): void {
  const u = donorDB.getDonor(hash)
  u.confirmed = true
  u.confirmHash = Context.transaction().hash
  donorDB.setDonor(hash, u)
  const h = Context.header()
  const c = new Confirm(description, h.createdAt, h.height, u.confirmHash)
  confirmDB.set(u.confirmHash, c.getEncoded())
}

export function getConfirmEncoded(hash: ArrayBuffer): ArrayBuffer {
  return confirmDB.get(hash)
}

export function getDonorEncoded(hash: ArrayBuffer): ArrayBuffer {
  return DonorDB.DONOR_DB.get(hash)
}

export function __idof(type: ABI_DATA_TYPE): u32 {
  return ___idof(type)
}
