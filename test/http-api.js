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

it('efx.cancelOrder(orderId)', async () => {
  const orderId = 1

  nock('https://api.ethfinex.com:443')
    .post('/trustless/cancelOrder', async (body) => {
      assert.equal(body.orderId, orderId)
      assert.equal(body.ethOrderMethod, '0x')

      assert.ok(body.signature)

      // sign the orderId from scratch
      let toSign = utils.sha3(orderId.toString(16))
      toSign = utils.bufferToHex(toSign).slice(2)

      const recovered = ecRecover(toSign, body.signature)

      assert.equal(efx.config.account.toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, {
      status: 'success',
      orderId: orderId
    })

  const response = await efx.cancelOrder(orderId)

  assert.equal(response.status, 'success')
  assert.equal(response.orderId, orderId)
})

it('efx.cancelSignedOrder(orderId, signedOrder)', async () => {
  const orderId = 1
  const signedOrder = await efx.sign.cancelOrder(orderId)

  nock('https://api.ethfinex.com:443')
    .post('/trustless/cancelOrder', async (body) => {
      assert.equal(body.orderId, orderId)
      assert.equal(body.ethOrderMethod, '0x')

      assert.ok(body.signature)

      // sign the orderId from scratch
      let toSign = utils.sha3(orderId.toString(16))
      toSign = utils.bufferToHex(toSign).slice(2)

      const recovered = ecRecover(toSign, body.signature)

      assert.equal(efx.config.account.toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, {
      status: 'success',
      orderId: orderId
    })

  const response = await efx.cancelSignedOrder(orderId, signedOrder)

  assert.equal(response.status, 'success')
  assert.equal(response.orderId, orderId)
})

it('efx.getOrder(orderId)', async () => {
  const orderId = 1

  nock('https://api.ethfinex.com:443')
    .post('/trustless/getOrder', (body) => {
      assert.equal(body.id, orderId)

      return true
    })
    .reply(200, { all: 'good' })

  const response = await efx.getOrder(orderId)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it('efx.getOrders()', async () => {
  nock('https://api.ethfinex.com:443')
    .post('/trustless/getOrders', (body) => {
      return true
    })
    .reply(200, { all: 'good' })

  const response = await efx.getOrders()
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it('efx.getPendingOrders()', async () => {
  nock('https://api.ethfinex.com:443')
    .post('/trustless/getPendingOrders', (body) => {
      assert.equal(body.protocol, '0x')

      return true
    })
    .reply(200, { all: 'good' })

  const response = await efx.getPendingOrders()
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it('efx.registerOrderList()', async () => {
  nock('https://api.ethfinex.com:443')
    .post('/trustless/registerOrderlist', async (body) => {
      const {
        request,
        signature
      } = body

      const {
        address,
        usage
      } = request

      assert.ok(address)
      assert.ok(request)
      assert.ok(signature)
      assert.equal(usage, 'efx-portal-orders')

      const recovered = ecRecover(JSON.stringify(request), signature)

      assert.equal(address.toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, {
      status: 'success',
      id: 1
    })

  const response = await efx.registerOrderList()

  assert.equal(response.status, 'success')
  assert.ok(response.id)
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

      assert.equal(efx.config.account.toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, { all: 'good' })

  const symbol = 'ETHUSD'
  const amount = 1
  const price = 100

  const response = await efx.submitOrder(symbol, amount, price)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it('efx.submitSignedOrder(order)', async () => {
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

      assert.equal(efx.config.account.toLowerCase(), recovered.toLowerCase())

      return true
    })
    .reply(200, { all: 'good' })

  const symbol = 'ETHUSD'
  const amount = 1
  const price = 100

  const order = efx.contract.createOrder(symbol, amount, price)

  const signedOrder = await efx.sign.order(order)

  const response = await efx.submitSignedOrder(signedOrder, symbol, amount, price)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})
