/* eslint-env mocha */

const { assert } = require('chai')
const nock = require('nock')

const utils = require('ethereumjs-util')
const instance = require('./instance')

let efx

before(async () => {
  efx = await instance()
})

it("efx.contract.depositLock('ZRX') // returns depositLock value", async () => {
  const token = 'ZRX'

  const response = await efx.contract.depositLock(token)

  assert.notOk(isNaN(response))
})

it("efx.contract.isApproved('ZRX') // returns allowance", async () => {
  const token = 'ZRX'

  const response = await efx.contract.isApproved(token)

  assert.notOk(isNaN(response))
})

it("efx.contract.approve('ZRX') // should yield Approval event", async () => {
  const token = 'ZRX'

  const response = await efx.contract.approve(token)

  assert.ok(response.events.Approval)
  // TODO: - validate receipt fields

})

it("efx.contract.lock('ETH', 0.0001, duration) // lock 0.0001 ETH", async () => {
  const token = 'ETH'
  const amount = 0.0001
  const duration = 25

  //const response = await efx.contract.lock(token, amount, duration)
  response = await efx.contract.lock(token, amount, duration)

  assert.ok(response.events.Deposit)

  // TODO: - validate receipt fields
})

it("efx.contract.lock('ZRX', 0.0001, duration) // lock 0.0001 ZRX", async () => {
  const token = 'ZRX'
  const amount = 0.0001
  const duration = 25

  //const response = await efx.contract.lock(token, amount, duration)
  response = await efx.contract.lock(token, amount, duration)

  assert.ok(response.events.Transfer)

  // TODO: - validate receipt fields
})

it("efx.contract.unlock('ETH', 0.0001) // unlock 0.0001 ETH", async () => {
  const token = 'ETH'
  const amount = 0.0001
  const duration = 25

  //const response = await efx.contract.lock(token, amount, duration)
  response = await efx.contract.unlock(token, amount)

  assert.ok(response.events.Withdrawal)

  // TODO: - validate receipt fields
})

it("efx.contract.unlock('ETH', 100) // fail to unlock 100 ETH", async () => {
  const token = 'ETH'
  const amount = 100
  const duration = 25

  //const response = await efx.contract.lock(token, amount, duration)
  try{
    response = await efx.contract.unlock(token, amount)
  } catch (error) {
    const test = /Transaction ran out of gas/.test(error.message)

    assert.ok(test)
  }

})
