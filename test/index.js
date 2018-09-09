/* eslint-env mocha */

const instance = require('./instance')
const { assert } = require('chai')
const nock = require('nock')

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

    const apiResponse = {
      "0x":{
          "minOrderTime":300,
          "tokenRegistry":{
            "ETH":{
                "decimals":18,
                "wrapperAddress":"0x965808e7f815cfffd4c018ef2ba4c5a65eba087e",
                "minOrderSize":0.02
            },
            "USD":{
                "decimals":6,
                "wrapperAddress":"0x83e42e6d1ac009285376340ef64bac1c7d106c89",
                "tokenAddress":"0x0736d0c130b2ead47476cc262dbed90d7c4eeabd",
                "minOrderSize":10
            }
          },
          "ethfinexAddress":"0x9faf5515f177f3a8a845d48c19032b33cc54c09c",
          "exchangeAddress":"0x67799a5e640bc64ca24d3e6813842754e546d7b1",
          "exchangeSymbols":[
            "tETHUSD"
          ]
      }
    }
    nock.recorder.rec()

    nock('https://test.ethfinex.com:443', {"encodedQueryParams":true})
      .post('/trustless/v1/r/get/conf', {})
      .reply(200, apiResponse)


    const efx = await instance(null, {defaultExpiry: 222})

    nock.restore()

    console.log( "efx.config ->", efx.config )

    return

    assert.ok(result['0x'])
    assert.ok(result['0x'].exchangeAddress)
    assert.ok(result['0x'].ethfinexAddress)
    assert.ok(result['0x'].exchangeSymbols)
    assert.ok(result['0x'].tokenRegistry)

    assert.ok(result['0x'].tokenRegistry.ETH)
    assert.equal(result['0x'].tokenRegistry.ETH.decimals, 18)

    assert.ok(result['0x'].tokenRegistry.ETH.wrapperAddress)

    assert.ok(result['0x'].tokenRegistry.USD)
    assert.ok(result['0x'].tokenRegistry.USD.wrapperAddress)
    //assert.ok(result['0x'].tokenRegistry.USDwrapperAddress)


  })

  // TODO: update mocked contracts, compile and deploy to ganache on every
  // test, this way we don't need a ropsten node running to test the blockchain
  // calls
  describe('Deploy contracts to test:rpc', () => {
    // require('./deploy')
  })

  describe('Account', () => {
    //require('./account')
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

  return

  describe('ETH calls', () => {
    require('./eth.js')
  })
})
