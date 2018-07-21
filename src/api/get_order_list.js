const { post } = require('request-promise')

module.exports = async (efx) => {
  const url = efx.config.api + '/getOrderList'

  const token = ((Date.now() / 1000) + 30) + ''

  const protocol = '0x'

  const signature = await efx.sign(token.toString(16))

  const data = {token, protocol, signature}

  return post(url, {json: data})
}
