/* eslint-env mocha */

const instance = require('./instance')
const { assert } = require('chai')

let efx

before(async () => {
  efx = await instance()
})

it('efx.account.select(0) // first account is selected by default', () => {
  return efx.account.select(0)
})

it('efx.account.balance() // return ETH balance', async () => {

  const response = await efx.account.balance()

  console.log( "eth balance ->", response )

  assert.notOk(isNaN(response))
})

it("efx.account.tokenBalance('ZRX')", async () => {
  const token = 'ZRX'

  const response = await efx.account.tokenBalance(token)

  assert.notOk(isNaN(response))
})

// NOTE:
//  - unlocking is necessary in order to sign.
//  - it seems MetaMask automatically asks to unlock when you try to sign
//  - test will fail if promise is rejected
it('efx.account.unlock(passwd) // unlock acount', () => {
  return efx.account.unlock('password')
})
