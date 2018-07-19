const { post } = require('request-promise')

module.exports = async (efx, symbol, amount, price, gid, cid) => {
  if (!(symbol && amount && price)) {
    throw new Error('symbol, amount and price are required')
  }

  const order = efx.contract.createOrder(symbol, amount, price)

  const meta = await efx.sign.order(order)

  const type = 'EXCHANGE LIMIT'

  const protocol = '0x'

  symbol = 't' + symbol

  const data = {
    gid,
    cid,
    type,
    symbol,
    amount,
    price,
    meta,
    protocol
  }

  const url = efx.config.api + '/submitOrder'

  return post(url, {json: data})
}
