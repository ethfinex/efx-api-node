const { post } = require('request-promise')

module.exports = (efx, id) => {
  const url = efx.config.api + '/cancelOrder'

  let data = {
    orderId: id
  }

  const signed = efx.sign(data)

  data.signature = signed

  return post(url, {json: data})
}
