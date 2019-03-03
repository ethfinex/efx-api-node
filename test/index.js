/* eslint-env mocha */

const instance = require('./instance')
const { assert } = require('chai')
const nock = require('nock')
const mockGetConf = require('./fixtures/nock/get_conf')

// TODO: use nockBack and record fixtures to disk.
// leaving this code here as reference
//
// const nockBack = require('nock').back
// nockBack.setMode('record');
// nockBack.fixtures = __dirname + '/fixtures/nock';

describe('~ efx-api-node', async () => {
  // sometimes nock gets stuck between test:watch
  nock.cleanAll()

  it('efx = await EFX(web3) // create an instance without throwing', async () => {

    //nock.recorder.rec()

    //mockGetConf()

    const efx = await instance(null, {defaultExpiry: 222})

    //nock.restore()

    assert.ok(efx.config['0x'])
    assert.ok(efx.config['0x'].exchangeAddress)
    assert.ok(efx.config['0x'].ethfinexAddress)
    assert.ok(efx.config['0x'].exchangeSymbols)
    assert.ok(efx.config['0x'].tokenRegistry)

    assert.ok(efx.config['0x'].tokenRegistry.ETH)
    assert.equal(efx.config['0x'].tokenRegistry.ETH.decimals, 18)

    assert.ok(efx.config['0x'].tokenRegistry.ETH.wrapperAddress)

    assert.ok(efx.config['0x'].tokenRegistry.USD)
    assert.ok(efx.config['0x'].tokenRegistry.USD.wrapperAddress)
    //assert.ok(result['0x'].tokenRegistry.USDwrapperAddress)

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

  return

  describe('HTTP API', () => {
    try {
      require('./http-api')
    } catch(e){

      console.log("e ->", e)
    }
  })

  describe('ETH calls', () => {
    require('./eth.js')
  })
})
