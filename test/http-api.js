/* eslint-env mocha */

const { assert } = require('chai')
const nock = require('nock')

const instance = require('./instance')
const {ZeroEx} = require('0x.js')
const utils = require('ethereumjs-util')

let efx

before(async () => {
  efx = await instance()
})

const ecRecover = require('./helpers/ecRecover')

it('efx.cancelOrder(orderId) // handle INVALID ERROR order', async () => {
  const orderId = 1
  const apiResponse = [
    'error',
    null,
    'ERR_API_BASE: ERR_EFXAPI_ORDER_INVALID'
  ]

  nock('https://staging.bitfinex.com:2998')
    .post('/trustless/v1/w/oc', async (body) => {
      assert.equal(body.orderId, orderId)
      assert.equal(body.protocol, '0x')

      assert.ok(body.signature)

      let toSign = utils.sha3(orderId.toString(16))
      toSign = utils.bufferToHex(toSign).slice(2)

      const recovered = ecRecover(toSign, body.signature)

      assert.equal(efx.get('account').toLowerCase(), recovered.toLowerCase())
      return true
    })
    .reply(500, apiResponse)

  try {
    await efx.cancelOrder(orderId)
  } catch (error) {
    assert.equal(error.statusCode, 500)
    assert.deepEqual(error.response.body, apiResponse)
  }
})

it('efx.cancelOrder(orderId, signedOrder) // cancels a previously signed order', async () => {
  const orderId = 1
  const signedOrder = await efx.sign.cancelOrder(orderId)
  const apiResponse = [1234]

  nock('https://staging.bitfinex.com:2998')
    .post('/trustless/v1/w/oc', async (body) => {
      assert.equal(body.orderId, orderId)
      assert.equal(body.protocol, '0x')

      assert.ok(body.signature)

      let toSign = utils.sha3(orderId.toString(16))
      toSign = utils.bufferToHex(toSign).slice(2)

      const recovered = ecRecover(toSign, body.signature)

      assert.equal(efx.get('account').toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, apiResponse)

  const response = await efx.cancelOrder(orderId, signedOrder)
  assert.deepEqual(response, apiResponse)
})

it('efx.getOrder(orderId)', async () => {
  efx.account.unlock('password')
  const orderId = 1

  const apiResponse = [[1234]]

  nock('https://staging.bitfinex.com:2998')
    .post('/trustless/v1/r/orders', (body) => {
      assert.equal(body.id, orderId)
      assert.equal(body.protocol, '0x')
      assert.ok(body.token)
      assert.ok(body.signature)

      // sign the token from scratched
      let toSign = body.token.toString(16)

      const recovered = ecRecover(toSign, body.signature)

      assert.equal(efx.get('account').toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, apiResponse)

  const response = await efx.getOrder(orderId)

  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.deepEqual(response, apiResponse)
})

it('efx.getOrders()', async () => {
  efx.account.unlock('password')

  const apiResponse = [[1234], [1235]]

  nock('https://staging.bitfinex.com:2998')
    .post('/trustless/v1/r/orders', (body) => {
      assert.ok(body.token)
      assert.ok(body.signature)

      assert.equal(body.protocol, '0x')

      // sign the token from scratched
      let toSign = body.token.toString(16)

      const recovered = ecRecover(toSign, body.signature)

      assert.equal(efx.get('account').toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, apiResponse)

  const response = await efx.getOrders()

  assert.deepEqual(response, apiResponse)
})

it('efx.getOrderHist(null, null, token, signature)', async () => {
  efx.account.unlock('password')

  const token = ((Date.now() / 1000) + 60 * 60 * 24) + ''
  const signature = await efx.sign(token.toString(16))

  const httpResponse = []

  nock('https://staging.bitfinex.com:2998')
    .post('/trustless/v1/r/orders/hist', (body) => {
      assert.equal(body.token, token)
      assert.equal(body.signature, signature)

      return true
    })
    .reply(200, httpResponse)

  const response = await efx.getOrdersHist(null, null, token, signature)

  assert.deepEqual(response, httpResponse)
})

it("efx.releaseTokens('ZRX')", async () => {
  const token = 'ZRX'

  nock('https://staging.bitfinex.com:2998')
    .post('/trustless/v1/w/releaseTokens', async (body) => {
      assert.ok(body.address)
      assert.equal(body.tokenAddress, efx.CURRENCIES[token].tokenAddress)

      return true
    })
    .reply(200, {
      status: 'success',
      releaseSignature: '0x...'
    })

  // REVIEW: releaseTokens still timing out
  // need to actually test it
  const response = await efx.releaseTokens(token)

  assert.ok(response.releaseSignature)
  assert.equal(response.status, 'success')
})

it('efx.submitOrder(ETHUSD, 1, 100)', async () => {
  nock('https://staging.bitfinex.com:2998')
    .post('/trustless/v1/submitOrder', async (body) => {
      assert.equal(body.type, 'EXCHANGE LIMIT')
      assert.equal(body.symbol, 'tETHUSD')
      assert.equal(body.amount, -0.1)
      assert.equal(body.price, 1000)
      assert.equal(body.protocol, '0x')

      const {meta} = body

      // TODO: actually hash the signature the same way and make
      // and test it instead of simply check if it exists
      assert.ok(meta.ecSignature)

      return true
    })
    .reply(200, { all: 'good' })

  const symbol = 'ETHUSD'
  const amount = -0.1
  const price = 1000

  const response = await efx.submitOrder(symbol, amount, price)

  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it('efx.submitSignedOrder(order)', async () => {
  await efx.account.unlock('password')

  // TODO: move tests with mocks to individual files, probably inside of
  // test/http/ folder
  const httpResponse = [ [ 1151079508,
    null,
    58552546110,
    'tETHUSD',
    1532189752551,
    1532189752568,
    -0.1,
    -0.1,
    'EXCHANGE LIMIT',
    null,
    50491123200000,
    null,
    0,
    'ACTIVE',
    null,
    null,
    10000,
    0,
    null,
    null,
    null,
    null,
    null,
    0,
    0,
    0,
    null,
    null,
    'BFX',
    null,
    null,
    [Object] ] ]

  nock('https://staging.bitfinex.com:2998')
    .post('/trustless/v1/submitOrder', async (body) => {
      assert.equal(body.type, 'EXCHANGE LIMIT')
      assert.equal(body.symbol, 'tETHUSD')
      assert.equal(body.amount, -0.1)
      assert.equal(body.price, 10000)
      assert.equal(body.protocol, '0x')

      const {meta} = body

      // TODO: actually hash the signature the same way and make
      // and test it instead of simply check if it exists
      assert.ok(meta.ecSignature)

      return true
    })
    .reply(200, httpResponse)

  const symbol = 'ETHUSD'
  const amount = -0.1
  const price = 10000

  const order = efx.contract.createOrder(symbol, amount, price)

  const signedOrder = await efx.sign.order(order)

  const response = await efx.submitSignedOrder(signedOrder, symbol, amount, price)

  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})
