/* eslint-env mocha */

const { assert } = require('chai')
const nock = require('nock')

const instance = require('./instance')

let efx

before(async () => {
  efx = await instance()
})

it('lock', async () => {
  const token = 'ETH'
  const amount = 'amount'
  const duration = 25

  const response = await efx.contract.lock(token, amount, duration)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it('unlock', async () => {
  const token = 'ETH'
  const amount = 'amount'

  // nock the call to send the signature
  nock('https://api.ethfinex.com:443')
    .post('/trustless', (body) => {
      // REVIEW: get_lock_signature is Stringifying json before posting?
      body = JSON.parse(body)

      // REVIEW: do we really want it to be body.contents instead of body.?
      assert.ok(body.contents)
      assert.ok(body.contents.address)
      assert.ok(body.contents.tokenAddress)
      assert.ok(body.contents.unlockUntil)

      return true
    })
    .reply(200, {
      signature: '0x...',
      unlockUntil: 25
    })

  const response = await efx.contract.unlock(token, amount)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})
