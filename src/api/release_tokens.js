const { post } = require('request-promise')

module.exports = (efx, token, unlockUntil) => {
  const url = efx.config.api + '/releaseTokens'

  const currency = efx.CURRENCIES[token]

  const data = {
    address: efx.config.account,
    tokenAddress: currency.tokenAddress,
    unlockUntil: unlockUntil
  }

  return post(url, {json: data})
}
