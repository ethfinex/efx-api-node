const {post} = require('request-promise')
const parse = require('../../lib/parse/response/submit_order')


// Previous vars: symbol, amount, price, gid, cid, signedOrder, validFor, partner_id, fee_rate, dynamicFeeRate
module.exports = async (efx, tokenId, amount, timeLimit = 300, price) => {
  // Add basic validation
  if (!tokenId) {
    throw new Error('tokenId is required');
  }

  if (!(amount && price)) {
    throw new Error('amount and price are required');
  }

  // Add signature (Authentication)
  //TODO: check if symbol is a valid symbol

  if(!signedOrder){

    //createOrder needs to be changed once order json is finalised
    const order = efx.contract.createOrder("symbol", amount, price, "validFor", "fee_rate")

    signedOrder = await efx.sign.order(order)
  }

  // Getting user address
  // efx has current account details
  const userAddress = efx.get('account');

  const data = {
    tokenId,
    amount,
    timeLimit,
    price,
    signedOrder,
    userAddress,
    order
  }

  const url = efx.config.api + '/stark/submitOrder'

  return parse(post(url, {json: data}))
}
