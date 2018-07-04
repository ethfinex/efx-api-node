/* eslint-env mocha */

const instance = require('./instance')

describe('~ efx-api-node', async () => {
  it('efx = await EFX(web3) // create an instance', () => {
    return instance()
  })

  describe('Account', () => {
    require('./account')
  })

  describe('Signing', () => {
    require('./signing')
  })

  describe('Blockchain API', () => {
    require('./blockchain-api')
  })

  describe('HTTP API', () => {
    require('./http-api')
  })
})
