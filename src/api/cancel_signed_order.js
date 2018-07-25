const { post } = require('request-promise')

module.exports = async (efx, orderId, signature) => {
  const url = efx.config.api + '/w/oc'

  const protocol = '0x'

  const data = {orderId, protocol, signature}

  return post(url, {json: data})
}
