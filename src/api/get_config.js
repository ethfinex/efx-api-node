const { post } = require('request-promise')
const parse = require('../lib/parse/response/orders')

module.exports = (efx) => {
  const url = efx.config.api + '/r/get/conf'

  return post(url, {json:{}})
}
