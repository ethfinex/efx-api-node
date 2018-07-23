const bind = require('./lib/bind_api')
const defaultConfig = require('./config')
const Web3 = require('web3')
const CURRENCIES = require('./currencies')
const aware = require('aware')

/**
 * web3 - web3 object
 * config - config to be merged with defaultConfig
 */
module.exports = async (web3, config = {}) => {
  // binds all ./api methods into a fresh object, similar to creating an instance
  let efx = bind()

  // adds key-value storage and event emitting capabilities
  aware(efx)

  // merge user config with default config
  efx.config = Object.assign({}, defaultConfig, config)

  // it's possible to overwrite contract map by providing CURRENCIES
  efx.CURRENCIES = config.CURRENCIES || CURRENCIES

  // working towards being as compatible as possible
  efx.isBrowser = typeof window !== 'undefined'

  efx.isMetaMask = false

  if (efx.isBrowser && window.web3) {
    efx.isMetaMask = window.web3.currentProvider.isMetaMask
  }

  // If no web3 is provided we will fallback to:
  // - window.web3.currentProvider object i.e. user is using MetaMask
  // - http://localhost:8545
  if (!web3) {
    // sudo make-me browser friendly
    if (efx.isBrowser && window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    } else {
      web3 = new Web3(efx.config.defaultProvider)
    }
  }

  // save web3 instance int it
  efx.web3 = web3

  // REVIEW: should we actually use web3.eth.defaultAccount ?
  // see: https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#raising_hand-account-list-reflects-user-preference
  await efx.account.select(efx.config.account)

  if(!efx.get('account')) {
    console.warn('Please specify a valid account or account index')
  }

  return efx
}

// convenient shortcuts
module.exports.CURRENCIES = CURRENCIES

module.exports.Web3 = Web3
