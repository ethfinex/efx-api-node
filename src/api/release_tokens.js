const { post } = require('request-promise')

module.exports = async (efx, coin, nonce, signature) => {
  const url = efx.config.api + '/w/releaseTokens'

  const currency = efx.CURRENCIES[coin]

  if (!nonce) {
    nonce = ((Date.now() / 1000) + 30) + ''

    signature = await efx.sign(nonce.toString(16))
  }

  const data = {
    nonce,
    signature,
    tokenAddress: currency.lockerAddress
  }

  return post(url, {json: data})
}
