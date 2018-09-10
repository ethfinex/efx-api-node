/**
 * Creats a client instance for testing
 **/
const deployed = require('./fixtures/contracts/deployed')
const Web3 = require('web3')

const EFX = require('..')

module.exports = async () => {
  const provider = new Web3.providers.HttpProvider('http://localhost:8545')

  const web3 = new Web3(provider)

  const accounts = await web3.eth.getAccounts()

  // automatically create a test account if none is available
  if (!accounts.length) {
    return web3.eth.personal.newAccount('password')
  }

  let config = {}

  // if we deployed contracts, then use the deployed ones
  if (Object.keys(deployed).length > 0) {
    console.log(' - Using deployed contracts')
  }

  config.api = 'https://test.ethfinex.com/trustless/v1'

  return EFX(web3, config)
}
