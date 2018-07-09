/* eslint-env mocha */

const { assert } = require('chai')
const nock = require('nock')

const utils = require('ethereumjs-util')
const instance = require('./instance')

let efx

before(async () => {
  efx = await instance()
})

it("efx.contract.isApproved('ZRX') // returns allowance", async () => {
  const token = 'ZRX'

  const response = await efx.contract.isApproved(token)

  assert.notOk(isNaN(response))
})

it("efx.contract.approve('ZRX') // should yield Approval event", async () => {
  const token = 'ZRX'

  try {
    // TODO:
    // - record response using nock.recorder.rec()
    const response = await efx.contract.approve(token)

    assert.ok(response.events.Approval)

  } catch ( error ) {
    console.log( 'Got error ->', error.message )
  }

})

return

it("efx.contract.lock('ETH', 0.0001, duration) // lock 0.0001 ETH", async () => {
  const token = 'ETH'
  const amount = '0.0001'
  const duration = 25

  const response = await efx.contract.lock(token, amount, duration)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})

it('unlock', async () => {
  const token = 'ZRX'
  const amount = '0.0001'

  // nock the call to send the signature
  nock('https://api.ethfinex.com:443')
    .post('/trustless/releaseTokens', (body) => {

      console.log( "body ->", body )

      return true

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
      signature: utils.keccak256(
        efx.config.account,
        efx.CURRENCIES[token].lockerAddress,
        'signatureValidUntilBlock'
      ),
      unlockUntil: 25
    })

  const response = await efx.contract.unlock(token, amount)
  // TODO:
  // - record real response using nock.recorder.rec()
  // - validate the actual response
  assert.ok(response)
})
