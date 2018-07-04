const { post } = require('request-promise')

module.exports = (efx) => {
  const url = efx.config.api + '/registerOrders'

  const data = {
    request: {
      address: '0x0...',
      usage: 'efx-portal-orders'
    },
    signature: 'web3signature'
  }

  return post(url, {json: data})
}
