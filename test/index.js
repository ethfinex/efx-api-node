/* eslint-env mocha */

const instance = require('./instance')
const nock = require('nock')

describe('~ efx-api-node', async () => {
  // sometimes nock gets stuck between test:watch
  nock.cleanAll()

  it('efx = await EFX(web3) // create an instance', () => {
    return instance()
  })

  describe('Account', () => {
    require('./account')
  })

  describe('Signing', () => {
     require('./signing')
  })

  describe('HTTP API', () => {
    require('./http-api')
  })

  describe('Blockchain API', () => {
    // require('./blockchain-api')
  })

  describe('ETH calls', () => {
     require('./eth.js')
  })
})
