const bind = require('./lib/bind_api')
const defaultConfig = require('./config')
const Web3 = require('web3')
const CURRENCIES = require('./currencies')

/**
 * web3 - web3 object
 * config - config to be merged with defaultConfig
 */
module.exports = async (web3, config) => {
  // create a client instance
  let efx = bind()

  // merge user config with default config
  efx.config = Object.assign({}, defaultConfig, config)

  efx.CURRENCIES = CURRENCIES

  // If no web3 is provided we will fallback to:
  // - window.web3.currentProvider object i.e. user is using MetaMask
  // - http://localhost:8545
  if (!web3) {
    // sudo make-me browser friendly
    if (window && window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    } else {
      web3 = new Web3(efx.config.defaultProvider)
    }
  }

  // save web3 instance int it
  efx.web3 = web3

  // REVIEW: should we actually use web3.eth.defaultAccount ?
  // see: https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#raising_hand-account-list-reflects-user-preference
  efx.config.account = await efx.account.select(efx.config.account)

  if (!efx.account) {
    throw new Error('You need an account')
  }

  return efx
}

module.exports.CURRENCIES = CURRENCIES

// for convenience on the browser distro
module.exports.Web3 = Web3
