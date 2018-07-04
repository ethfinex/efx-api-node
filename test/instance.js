/**
 * Creats a client instance for testing
 **/
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

  return EFX(web3)
}
