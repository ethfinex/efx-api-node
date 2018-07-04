const { post } = require('request-promise')

module.exports = (client, id) => {
  const url = client.config.api + '/getOrder'

  const data = { id }

  return post(url, {json: data})
}
