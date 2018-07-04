const { post } = require('request-promise')

module.exports = (efx, id) => {
  const url = efx.config.api + '/getOrder'

  const data = { id }

  return post(url, {json: data})
}
