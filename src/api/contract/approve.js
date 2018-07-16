/**
 * Approves a token for locking
 *
 */

module.exports = (efx, token) => {
  const currency = efx.CURRENCIES[token]

  // REVIEW: 2 ** 256 -1 should be the max value for "uint"
  const amount = ((2 ** 256) - 1).toString(16)

  const args = [
    currency.lockerAddress, // address _spender
    amount // uint amount
  ]

  const action = 'approve'

  return efx.eth.send(
    efx.contract.abi.token,
    currency.tokenAddress,
    action,
    args
  )
}
