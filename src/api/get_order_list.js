const { post } = require('request-promise')

module.exports = async (efx, token, signature) => {
  const url = efx.config.api + '/getOrderList'

  const protocol = '0x'

  if (!token) {
    token = ((Date.now() / 1000) + 30) + ''

    signature = await efx.sign(token.toString(16))
  }

  const data = {token, protocol, signature}

  return post(url, {json: data})
}
