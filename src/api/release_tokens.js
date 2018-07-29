const { post } = require('request-promise')

module.exports = async (efx, coin, token, signature) => {
  const url = efx.config.api + '/w/releaseTokens'

  const currency = efx.CURRENCIES[coin]

  if (!token) {
    token = ((Date.now() / 1000) + 30) + ''

    signature = await efx.sign(token.toString(16))
  }

  const data = {
    token,
    signature,
    tokenAddress: currency.tokenAddress
  }

  return post(url, {json: data})
}
