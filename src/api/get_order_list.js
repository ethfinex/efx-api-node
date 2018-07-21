const { post } = require('request-promise')

module.exports = (efx) => {
  const url = efx.config.api + '/getOrderList'

  const token = ((Date.now() / 1000) + 30) + ''
  const protocol = '0x'

  const data = {token, protocol}

  return post(url, {json: data})
}
