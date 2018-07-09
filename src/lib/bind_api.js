/**
 * - Creates a client instance
 * - Load all functions from the ./api folder into this instance
 * - Binds the functions so they will always receive client as first argument
 *
 * This way we get a regular looking API on top of functional code
 */
const _ = require('lodash')

module.exports = () => {
  const client = {}

  const compose = (funk) => {
    return _.partial(funk, client)
  }

  // web3 account related
  client.account = {
    balance: compose(require('../api/account/balance')),
    tokenBalance: compose(require('../api/account/token_balance')),
    select: compose(require('../api/account/select')),
    unlock: compose(require('../api/account/unlock'))
  }

  // blockchain api
  client.contract = {
    approve: compose(require('../api/contract/approve')),
    isApproved: compose(require('../api/contract/is_approved')),
    lock: compose(require('../api/contract/lock')),
    unlock: compose(require('../api/contract/unlock')),
    abi: {
      locker: require('../api/contract/abi/locker.abi.js'),
      token: require('../api/contract/abi/token.abi.js')
    },
    errors: require('../api/contract/errors')
  }

  // eth api utils
  client.eth = {
    call: compose(require('../api/eth/call')),
    send: compose(require('../api/eth/send')),
    getNetwork: compose(require('../api/eth/get_network'))
  }

  // signing
  client.sign = compose(require('../api/sign/sign'))

  // hack in order to have 'efx.sign' on the API instead of 'efx.sign.sign'
  client.sign.order = compose(require('../api/sign/order'))
  client.sign.cancel_order = compose(require('../api/sign/cancel_order'))
  client.sign.request = compose(require('../api/sign/request'))
  client.sign.lock = compose(require('../api/sign/lock'))

  // http api
  client.cancelOrder = compose(require('../api/cancel_order'))
  client.getOrder = compose(require('../api/get_order'))
  client.getOrders = compose(require('../api/get_orders'))
  client.getPendingOrders = compose(require('../api/get_pending_orders'))
  client.registerOrders = compose(require('../api/register_orders'))
  client.releaseTokens = compose(require('../api/release_tokens'))
  client.submitOrder = compose(require('../api/submit_order'))

  return client
}
