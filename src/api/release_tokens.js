const { post } = require('request-promise')

module.exports = (efx, token) => {
  const url = efx.config.api + '/w/releaseTokens'

  const currency = efx.CURRENCIES[token]

  const data = {
    address: efx.get('account'),
    tokenAddress: currency.tokenAddress
  }

  return post(url, {json: data})
}
