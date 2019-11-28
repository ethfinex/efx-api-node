const {post} = require('request-promise');
const parse = require('../lib/parse/response/deposit_amount.js');
const sw = require("starkware_crypto");

module.exports = async (efx, tokenId, amount) => {
  const userAddress = efx.get('account');
  const startKey = '0x234';

  // Basic validation
  if (!tokenId) {
    throw new Error('tokenId is required')
  }

  if (!amount) {
    throw new Error('amount is required')
  }

  // Create quantized amount
  amount = 100

  // tempVault will be available to the client via config
  const tempVaultId = 1 // default DeversiFi vault id
  const vaultId = 2 // users vault id for the tokens that have been deposited

  // Deposit to contract
  const depositStatus = await efx.contract.deposit(vaultId, amount, userAddress);
  await depositStatus.then(receipt => {
    // create stark message and signature using stark crypto library
    //replace get_order_msg with deposit and transfer message when its available
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
    
    }, e => {
      // Error handling, user corrections
      throw new Error('deposit not happened. something went wrong')
  })

  // Send required params to efx-pub-api
  const url = efx.config.api + '/stark/deposit';
  const data = {
    userAddress,
    startKey,
    tempVaultId,
    vaultId,
    tokenId,
    amount,
    starkMessage,
    starkSignature
  };

  return parse(post(url, {json: data}))
}
