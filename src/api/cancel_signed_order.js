const { post } = require('request-promise')

module.exports = async (efx, id, signedOrder) => {
  const url = efx.config.api + '/cancelOrder'

  const ethOrderMethod = '0x'

  let data = {
    orderId: id,
    ethOrderMethod
  }

  data.signature = signedOrder

  return post(url, {json: data})
}
