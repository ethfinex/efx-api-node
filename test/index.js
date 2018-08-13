/* eslint-env mocha */

const instance = require('./instance')
const nock = require('nock')

// TODO: use nockBack and record fixtures to disk.
// leaving this code here for now as reference
//
// const nockBack = require('nock').back
// nockBack.setMode('record');
// nockBack.fixtures = __dirname + '/fixtures/nock';

describe('~ efx-api-node', async () => {
  // sometimes nock gets stuck between test:watch
  nock.cleanAll()

  it('efx = await EFX(web3) // create an instance without throwing', async () => {
    const efx = await instance()
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
    //require('./signing')
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

  return

  describe('ETH calls', () => {
    require('./eth.js')
  })
})
