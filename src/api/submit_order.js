const { post } = require('request-promise')

module.exports = async (efx, symbol, amount, price, gid, cid) => {
  if (!(symbol && amount && price)) {
    throw new Error('symbol, amount and price are required')
  }

  gid = gid || 1 // REVIEW: shall we make it unique as well?
  cid = cid || new Date().getTime()

  const orderObject = await efx.sign.order(symbol, amount, price)

  const type = 'EXCHANGE LIMIT'

  const ethOrderMethod = '0x'

  symbol = 't' + symbol

  const data = {
    gid,
    cid,
    type,
    symbol,
    amount,
    price,
    orderObject,
    ethOrderMethod
  }

  const url = efx.config.api + '/submitOrder'

  return post(url, {json: data})
}
