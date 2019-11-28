const {post} = require('request-promise');
const parse = require('../lib/parse/response/deposit_amount.js');

module.exports = async (efx, tokenId, amount) => {
  // Basic validation
  if (!tokenId) {
    throw new Error('tokenId is required')
  }

  if (!amount) {
    throw new Error('amount is required')
  }

  // Create quantized amount
  amount = 100

  // Adding tempVaultId
  const vaultId = 2

  // Deposit to contract
  // const starkInstance = await efx.contract(starkAbi, JSON.parse(dexAddress))

  // Error handling, user corrections

  // Sign deposit params

  const url = efx.config.api + '/stark/deposit';

  return parse(post(url, {json: data}))
}
