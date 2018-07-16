const { post } = require('request-promise')

module.exports = (efx) => {
  const url = efx.config.api + '/getPendingOrders'

  const data = { protocol: '0x' }

  return post(url, {json: data})
}
