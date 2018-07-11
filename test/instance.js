/**
 * Creats a client instance for testing
 **/
const deployed = require('./contracts/deployed')
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
  if(Object.keys(deployed).length > 0) {

    console.log( " - Using deployed contracts")
    config = {
      CURRENCIES: {
        ETH: {
          decimals: 18,
          tokenAddress: deployed.WETH9_.options.address,
          lockerAddress: deployed.WETH9_.options.address
        },
        USD: {
          decimals: 6,
          tokenAddress: deployed.WUSD9_.options.address,
          lockerAddress: deployed.WUSD9_.options.address
        },
        ZRX: {
          decimals: 18,
          tokenAddress: deployed.ZRXToken.options.address,
          lockerAddress: '0xafb7c8b4a5abc354afdac2fdc6966f060b11f928'
        }
      }
    }
  }

  return EFX(web3, config)
}
