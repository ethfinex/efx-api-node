const { post } = require('request-promise')

module.exports = (client, id) => {
  const url = client.config.api + '/getPendingOrders'

  const data = { protocol: '0x' }

  return post(url, {json: data})
}
