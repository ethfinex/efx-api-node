const { post } = require('request-promise')

module.exports = (client, id) => {
  const url = client.config.api + '/cancelOrder'

  const data = {
    orderId: id,
    signature: 'web3signature'
  }

  return post(url, {json: data})
}
