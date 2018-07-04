const { post } = require('request-promise')

module.exports = (client, id) => {
  const url = client.config.api + '/getOrders'

  const data = {
    id: id,
    token: 'ETH',
    protocol: '0x'
  }

  return post(url, {json: data})
}
