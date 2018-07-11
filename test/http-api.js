/* eslint-env mocha */

const { assert } = require('chai')
const nock = require('nock')

const instance = require('./instance')
const {ZeroEx} = require('0x.js')

let efx

before(async () => {
  efx = await instance()
})

it('efx.cancelOrder(orderId)', async () => {
  const orderId = 1

  nock('https://api.ethfinex.com:443')
    .post('/trustless/cancelOrder', (body) => {
      assert.equal(body.orderId, orderId)

      assert.ok(body.signature)

      return true
    })
    .reply(200, { all: 'good' })

  const response = await efx.cancelOrder(orderId)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
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

      const {ecRecover} = efx.web3.eth.personal

      const recovered = await ecRecover(request, signature)

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

it('efx.submitOrder()', async () => {
  nock('https://api.ethfinex.com:443')
    .post('/trustless/submitOrder', async (body) => {
      assert.ok(body.cid)
      assert.equal(body.type, 'EXCHANGE LIMIT')
      assert.equal(body.symbol, 'tETHUSD')
      assert.equal(body.amount, 1)
      assert.equal(body.price, 100)

      const {orderObject} = body

      const orderHash = ZeroEx.getOrderHashHex(orderObject)

      const {ecRecover} = efx.web3.eth.personal

      const recovered = await ecRecover(orderHash, orderObject.ecSignature)

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
