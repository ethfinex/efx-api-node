const { post } = require('request-promise')
const parse = require('../lib/parse/response/orders')

module.exports = async (efx, symbol, id, nonce, signature) => {
  let url = efx.config.api + '/get/conf'

  response = await post(url)

  console.log( "got response ->", response )

  return response
}
