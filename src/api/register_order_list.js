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

  // REVIEW: Stringifying .request here so we can ecRecover on the other side
  // without relying on eth.sign executing JSON.stringify
  data.signature = await efx.sign(JSON.stringify(data.request))

  return post(url, {json: data})
}
