const { post } = require('request-promise')

module.exports = async (efx, id) => {
  const url = efx.config.api + '/cancelOrder'

  const ethOrderMethod = '0x'

  let data = {
    orderId: id,
    ethOrderMethod,
  }

  data.signature = await efx.sign.cancelOrder(id)

  return post(url, {json: data})
}
