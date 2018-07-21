/* eslint-env mocha */

const instance = require('./instance')
const nock = require('nock')

let efx

describe('~ efx-api-node', async () => {
  // sometimes nock gets stuck between test:watch
  nock.cleanAll()

  it('efx = await EFX(web3) // create an instance without throwing', async () => {
    efx = await instance()

    console.log('You current account: ', efx.config.account)
  })

  describe('Deploy contracts to test:rpc', () => {
    // require('./deploy')
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

  describe('ETH calls', () => {
    require('./eth.js')
  })
})
