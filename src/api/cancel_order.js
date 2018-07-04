const { post } = require('request-promise')

module.exports = (efx, id) => {
  const url = efx.config.api + '/cancelOrder'

  const data = {
    orderId: id,
    signature: 'web3signature'
  }

  return post(url, {json: data})
}
