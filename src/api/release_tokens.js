const { post } = require('request-promise')

module.exports = (efx, token) => {
  const url = efx.config.api + '/releaseTokens'

  const currency = efx.CURRENCIES[token]

  const data = {
    address: efx.config.account,
    tokenAddress: currency.tokenAddress
  }

  return post(url, {json: data})
}
