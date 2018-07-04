const { post } = require('request-promise')

module.exports = (client, id) => {
  const url = client.config.api + '/releaseTokens'

  const data = {
    address: '0x01...',
    tokenAddress: '0x02...',
    unlockUntil: 123456
  }

  return post(url, {json: data})
}
