const { post } = require('request-promise')

module.exports = (efx) => {
  const url = efx.config.api + '/getOrders'

  const data = {
    token: 'ETH',
    protocol: '0x'
  }

  return post(url, {json: data})
}
