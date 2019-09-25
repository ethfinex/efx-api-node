const {post} = require('request-promise')
const stableCoins = require('./stableCoins')

module.exports = async (token) => {
  if (stableCoins[token]) {
    return stableCoins[token]
  }

  const response = await post({
    url: `https://api-pub.bitfinex.com/v2/calc/fx`,
    json: true,
    body: {
      ccy1: token,
      ccy2: 'USD'
    }
  })

  return response[0]
}
