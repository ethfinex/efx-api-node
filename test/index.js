/* eslint-env mocha */

const instance = require('./instance')
const nock = require('nock')

let efx

describe('~ efx-api-node', async () => {
  // sometimes nock gets stuck between test:watch
  nock.cleanAll()

  it('efx = await EFX(web3) // create an instance without throwing', async () => {
    efx = await instance()
  })

  // TODO: update mocked contracts, compile and deploy to ganache on every
  // test, this way we don't need a ropsten node running to test the blockchain
  // calls
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
    // comment the line below if you want to skip blockchain tests
    // you need a ropsten node with some ETH / ZRX in order to test
    // those. FIXME: need contracts deployed during test
    //require('./blockchain-api')
  })

  describe('HTTP API', () => {
    require('./http-api')
  })

  describe('ETH calls', () => {
    require('./eth.js')
  })
})
