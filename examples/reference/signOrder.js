// Test Script For Generating Orders with efxapi
// Option 1. Raw Private Key Signing

// Example is sell 0.001 ETH @1000 for 1 USD

const sellAmount = 0.001
const buyAmount = 1

const sellCurr = {
  'string': 'ETH',
  'decimals': 18,
  'tokenAddr': '0x991f0e5c5775ca9dd02e30e67f545c36cff3690e'
}
const buyCurr = {
  'string': 'USD',
  'decimals': 6,
  'tokenAddr': '0xdac17f958d2ee523a2206206994597c13d831ec7'
}

const pair = 'tETHUSD'
const orderAmount = -1 * sellAmount
const orderPrice = buyAmount / sellAmount

const ethfinexAddress = '0x9faf5515f177f3a8a845d48c19032b33cc54c09c'
const exchangeContractAddress = '0x0000000000000000000000000000000000000000'


const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const { ZeroEx } = require('0x.js')

////// 1. Signing via exposed private key (for easy testing with no local node)
const testPrivateKey = '0x----'
const testUserAddress = '0x---'

// create order object
let order = {
  expirationUnixTimestampSec: web3.utils.toBN(Math.round((new Date()).getTime() / 1000) + ( 60 * 60)).toString(10),
  feeRecipient: ethfinexAddress,
  maker: testUserAddress.toLowerCase(),
  makerFee: web3.utils.toBN('0'),
  makerTokenAddress: sellCurr.tokenAddr,
  makerTokenAmount: web3.utils.toBN(10 ** sellCurr.decimals * sellAmount).toString(10),
  salt: ZeroEx.generatePseudoRandomSalt(),
  taker: ethfinexAddress,
  takerFee: web3.utils.toBN('0'),
  takerTokenAddress: buyCurr.tokenAddr,
  takerTokenAmount: web3.utils.toBN(10 ** buyCurr.decimals * buyAmount).toString(10),
  exchangeContractAddress: exchangeContractAddress
}

let orderHash = ZeroEx.getOrderHashHex(order)
let signature = web3.eth.accounts.sign(orderHash, testPrivateKey)
const signedOrder = Object.assign({}, order, {ecSignature: signature})

let apiOrder = [
  0,
  'on',
  null,
  {
    'gid': 1,
    'cid': new Date().getTime(),
    'type': 'EXCHANGE LIMIT',
    'symbol': pair,
    'amount': orderAmount,
    'price': orderPrice,
    'meta': signedOrder
  }
]

console.log(JSON.stringify(apiOrder[3]))

console.log(signedOrder)
