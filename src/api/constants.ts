import tool = require('@salaku/js-sdk')
import abi = require('@/contracts/welfare.abi.json')

export const rpc = new tool.RPC(location.hostname, '7010')
export const CONTRACT_ADDRESS = '664ac90d498a460accf9feee8994d93981998c1b'
export const CONTRACT = new tool.Contract(CONTRACT_ADDRESS, abi)

// 捐赠人的私钥
export const PRIVATE_KEY =
  'f00df601a78147ffe0b84de1dffbebed2a6ea965becd5d0bd7faf54f1f29c6b5'

// 捐赠人的地址
export const ADDRESS = tool.publicKey2Address(
  tool.privateKey2PublicKey(PRIVATE_KEY)
)

// 红十字会的私钥
export const CROSS_PRIAVTE_KEY =
  'b8bcde6ea12982ff341cef358040584e0b397b51beaf0b11a45f80be9b5dfe33'
