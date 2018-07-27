const {post} = require('request-promise')

module.exports = async (efx, symbol, amount, price, gid, cid, signedOrder) => {
  if (!(symbol && amount && price)) {
    throw new Error('order, symbol, amount and price are required')
  }

  //TODO: check if symbol is a valid symbol

  if(!signedOrder){
    const order = efx.contract.createOrder(symbol, amount, price)

    signedOrder = await efx.sign.order(order)
  }

  const meta = signedOrder

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

  const url = efx.config.api + '/w/on'

  return post(url, {json: data})
}
