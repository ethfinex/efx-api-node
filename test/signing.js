/* eslint-env mocha */

const { assert } = require('chai')

const CURRENCIES = require('../src/currencies')
const instance = require('./instance')
const ecRecover = require('./helpers/ecRecover')

let efx

before(async () => {
  efx = await instance()
})

it('efx.sign(toSign) // sign arbitrary objects', async () => {
  await efx.account.unlock('password')

  // when signing hex values we should remove the 0x
  const message = '0xa4d9a634348b09f23a5bbd3568f8b12b91ff499c'

  const signature = await efx.sign(message.slice(2))

  const recovered = ecRecover(message.slice(2), signature)

  assert.equal(efx.config.account.toLowerCase(), recovered.toLowerCase())
})

it('efx.sign.order(ETHUSD, 1.5, 300) // sign a buy order', async () => {
  await efx.account.unlock('password')

  const symbol = 'ETHUSD'
  const amount = 1.5
  const price = 300

  const signed = await efx.sign.order(symbol, amount, price)

  const sellAmount = amount * price
  const makerAmount = efx.web3.utils.toBN(10 ** CURRENCIES.USD.decimals * sellAmount).toString(10)

  assert.equal(signed.makerTokenAddress, CURRENCIES.USD.tokenAddress)
  assert.equal(signed.makerTokenAmount, makerAmount)

  const buyAmount = amount
  const takerAmount = efx.web3.utils.toBN(10 ** CURRENCIES.ETH.decimals * buyAmount).toString(10)
  assert.equal(signed.takerTokenAddress, CURRENCIES.ETH.tokenAddress)
  assert.equal(signed.takerTokenAmount, takerAmount)
})

it('efx.sign.order(ETHUSD, -1.5, 300) // sign a sell order', async () => {
  await efx.account.unlock('password')

  const symbol = 'ETHUSD'
  const amount = -1.5
  const price = 300

  const signed = await efx.sign.order(symbol, amount, price)

  const sellAmount = Math.abs(amount)
  const makerAmount = efx.web3.utils.toBN(10 ** CURRENCIES.ETH.decimals * sellAmount).toString(10)

  assert.equal(signed.makerTokenAddress, CURRENCIES.ETH.tokenAddress)
  assert.equal(signed.makerTokenAmount, makerAmount)

  const buyAmount = Math.abs(amount * price)
  const takerAmount = efx.web3.utils.toBN(10 ** CURRENCIES.USD.decimals * buyAmount).toString(10)

  assert.equal(signed.takerTokenAddress, CURRENCIES.USD.tokenAddress)
  assert.equal(signed.takerTokenAmount, takerAmount)

  // TODO:
  // - Test feeRecipient field
  // - Test maker field
})
