const { post } = require('request-promise')

module.exports = async (efx) => {
  const { config } = efx

  const url = config.api + '/registerOrderlist'

  let data = {
    request: {
      address: config.account,
      usage: 'efx-portal-orders'
    }
  }

  data.signature = await efx.sign(data)

  return post(url, {json: data})
}
