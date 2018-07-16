/**
 * Check if a token is approved for locking
 */
module.exports = (efx, token) => {
  // REVIEW: shall we throw if token is ETH or USDT ?
  const currency = efx.CURRENCIES[token]

  const args = [
    efx.config.account, // address _owner
    currency.lockerAddress // address _spender
  ]

  const action = 'allowance'

  return efx.eth.call(efx.contract.abi.token, currency.tokenAddress, action, args)
}
