const { post } = require('request-promise')

module.exports = async (efx, symbol, id, token, signature) => {
  let url = efx.config.api + '/r/orders'

  if (symbol) {
    url += '/t' + symbol
  }

  const protocol = '0x'

  if (!token) {
    token = ((Date.now() / 1000) + 30) + ''

    signature = await efx.sign(token.toString(16))
  }

  const data = {id, token, signature, protocol}

  return post(url, {json: data})
}
