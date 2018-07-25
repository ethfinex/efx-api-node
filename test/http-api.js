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

it('efx.cancelOrder(orderId) invalid order should yield an error', async () => {
  const orderId = 1151079522
  const apiResponse = [
    'error',
    null,
    'ERR_API_BASE: ERR_EFXAPI_ORDER_INVALID'
  ]

  nock('https://api.ethfinex.com:443')
    .post('/trustless/v1/w/oc', async (body) => {
      assert.equal(body.orderId, orderId)
      assert.equal(body.ethOrderMethod, '0x')

      assert.ok(body.signature)

      // sign the orderId from scratch
      let toSign = utils.sha3(orderId.toString(16))
      toSign = utils.bufferToHex(toSign).slice(2)

      const recovered = ecRecover(toSign, body.signature)

      assert.equal(efx.get('account').toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, {orderId})

  try {
    const response = await efx.cancelOrder(orderId)
  } catch(error){
    assert.equal(error.statusCode, 500)
    assert.deepEqual(error.response.body, apiResponse )
  }

  // REVIEW: it will not yield an error first time you run
  // with a valid order ( :
})

it('efx.cancelSignedOrder(orderId, signedOrder)', async () => {
  const orderId = 1
  const signedOrder = await efx.sign.cancelOrder(orderId)
  const apiResponse = [
    'error',
    null,
    'ERR_API_BASE: ERR_EFXAPI_ORDER_INVALID'
  ]

  nock('https://api.ethfinex.com:443')
    .post('/trustless/v1/w/oc', async (body) => {
      assert.equal(body.orderId, orderId)
      assert.equal(body.ethOrderMethod, '0x')

      assert.ok(body.signature)

      // sign the orderId from scratch
      let toSign = utils.sha3(orderId.toString(16))
      toSign = utils.bufferToHex(toSign).slice(2)

      const recovered = ecRecover(toSign, body.signature)

      assert.equal(efx.get('account').toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, {orderId})

  try {
    const response = await efx.cancelSignedOrder(orderId, signedOrder)
  } catch(error){
    assert.equal(error.statusCode, 500)
    assert.deepEqual(error.response.body, apiResponse )
  }

  // REVIEW: it will not yield an error first time you run
  // with a valid order ( :
})

return

it('efx.getOrder(orderId)', async () => {
  const orderId = 1

  nock('https://api.ethfinex.com:443')
    .post('/trustless/r/orders', (body) => {
      //assert.equal(body.id, orderId)

      console.log( "body ->", body )

      return true
    })
    .reply(200, { all: 'good' })

  const response = await efx.getOrders(null, orderId)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  //assert.ok(response)
})

return

it('efx.getOrderList()', async () => {
  efx.account.unlock('password')

  const httpResponse = []

  nock('https://api.ethfinex.com:443')
    .post('/trustless/getOrderList', (body) => {
      assert.ok(body.token)
      assert.equal(body.protocol, '0x')
      return true
    })
    .reply(200, httpResponse)

  const response = await efx.getOrderList()
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it('efx.getOrderList(token, signature)', async () => {
  efx.account.unlock('password')

  const token = ((Date.now() / 1000) + 60 * 60 * 24) + ''
  const signature = await efx.sign(token.toString(16))

  const httpResponse = []

  nock('https://api.ethfinex.com:443')
    .post('/trustless/getOrderList', (body) => {
      assert.ok(body.token)
      assert.equal(body.protocol, '0x')
      return true
    })
    .reply(200, httpResponse)

  const response = await efx.getOrderList(token, signature)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it("efx.releaseTokens('ZRX')", async () => {
  const token = 'ZRX'

  nock('https://api.ethfinex.com:443')
    .post('/trustless/releaseTokens', async (body) => {
      assert.ok(body.address)
      assert.equal(body.tokenAddress, efx.CURRENCIES[token].tokenAddress)

      return true
    })
    .reply(200, {
      status: 'success',
      releaseSignature: '0x...'
    })

  const response = await efx.releaseTokens(token)

  assert.ok(response.releaseSignature)
  assert.equal(response.status, 'success')
})

it('efx.submitOrder(ETHUSD, 1, 100)', async () => {
  nock('https://api.ethfinex.com:443')
    .post('/trustless/submitOrder', async (body) => {
      assert.equal(body.type, 'EXCHANGE LIMIT')
      assert.equal(body.symbol, 'tETHUSD')
      assert.equal(body.amount, 1)
      assert.equal(body.price, 100)
      assert.equal(body.protocol, '0x')

      const {meta} = body

      const orderHash = ZeroEx.getOrderHashHex(meta)

      const recovered = ecRecover(orderHash.slice(2), meta.ecSignature)

      assert.equal(efx.get('account').toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, { all: 'good' })

  const symbol = 'ETHUSD'
  const amount = -0.1
  const price = 1000

  const response = await efx.submitOrder(symbol, amount, price)

  console.log('response ->', response)

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

  nock('https://api.ethfinex.com:443')
    .post('/trustless/submitOrder', async (body) => {
      assert.equal(body.type, 'EXCHANGE LIMIT')
      assert.equal(body.symbol, 'tETHUSD')
      assert.equal(body.amount, 1)
      assert.equal(body.price, 100)
      assert.equal(body.protocol, '0x')

      const {meta} = body

      const orderHash = ZeroEx.getOrderHashHex(meta)

      const recovered = ecRecover(orderHash.slice(2), meta.ecSignature)

      assert.equal(efx.get('account').toLowerCase(), recovered.toLowerCase())

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
