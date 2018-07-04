/* eslint-env mocha */

const instance = require('./instance')

let efx

before(async () => {
  efx = await instance()
})

it('efx.account.select(0) // first account is selected by default', () => {
  return efx.account.unlock('password')
})

// NOTE:
//  - unlocking is necessary in order to sign.
//  - it seems MetaMask automatically asks to unlock when you try to sign
//  - test will fail if promise is rejected
it('efx.account.unlock(passwd) // unlock acount', () => {
  return efx.account.unlock('password')
})
