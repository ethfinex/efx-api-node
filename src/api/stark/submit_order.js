const {post} = require('request-promise')
const parse = require('../../lib/parse/response/submit_order')
const sw = require("starkware_crypto");

// Previous vars: symbol, amount, price, gid, cid, signedOrder, validFor, partner_id, fee_rate, dynamicFeeRate
module.exports = async (efx, tokenId, amount, timeLimit = 300, price) => {
  // Add basic validation
  if (!tokenId) {
    throw new Error('tokenId is required');
  }

  if (!(amount && price)) {
    throw new Error('amount and price are required');
  }
    
  //TODO: check if symbol is a valid symbol

  if(!signedOrder){

    //createOrder needs to be changed once order json is finalised
    const order = efx.contract.createOrder("symbol", amount, price, "validFor", "fee_rate")

    signedOrder = await efx.sign.order(order)

    // Add signature (Authentication)
  // create stark message and signature using stark crypto library
    //replace get_order_msg  message when its available or updated
    const starkMessage = sw.get_order_msg(
      vault_id,//tempVault
      vault_id,//userTokenVaultId
      "0",
      "0",
      token_id,
      token_id,
      order_id_b,
      99999999
    );
  
    //sign using stark crypto library
    const starkSignature = sw.sign(starkMessage, key_pair);
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
