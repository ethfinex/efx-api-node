/* eslint-env mocha */

const { assert } = require('chai')
const nock = require('nock')
const utils = require('ethereumjs-util')

const CURRENCIES = require('../src/currencies')
const instance = require('./instance')

let efx

before(async () => {
  efx = await instance()
})

it('efx.sign(toSign) // sign arbitrary objects', async () => {
  await efx.account.unlock('password')

  const message = utils.bufferToHex(efx.web3.utils.sha3('xyz'))
  const signed = await efx.sign(message)

  assert.ok(signed)

  // TODO: make this recover routine work
  // const r = signed.slice(2, 66)
  // const s = signed.slice(66, 130)
  // const v = parseInt(signed.slice(130, 132), 16).toString(10)

  // const pub = utils.ecrecover(
  // new Buffer(message, 'hex'),
  // v,
  // new Buffer(r, 'hex'),
  // new Buffer(s, 'hex')
  // )

  // const recovered = utils.bufferToHex(utils.pubToAddress(pub))

  // assert.equal( efx.config.account, recovered )

  // console.log('  account ->', efx.config.account)
  // console.log('recovered ->', recovered)
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

/**
 *
 * No need to sign lock requests, as they happen directly between user
 * and web3
it('efx.sign.lock(address, duration) // sign a lock request', async () => {
  const token = 'ETH'
  const duration = 25

  // nock the call to send the signature
  nock('https://api.ethfinex.com:443')
    .post('/trustless', (body) => {
      // REVIEW: get_lock_signature is Stringifying json before posting?
      body = JSON.parse(body)

      // REVIEW: do we really want it to be body.contents instead of body.?
      assert.ok(body.contents)
      assert.ok(body.contents.address)
      assert.ok(body.contents.unlockUntil)

      return true
    })
    .reply(200, {
      signature: '0x...',
      unlockUntil: 25
    })

  const response = await efx.sign.lock(token, duration)

  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response.signature)
  assert.ok(response.unlockUntil)
}) **/
