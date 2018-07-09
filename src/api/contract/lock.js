/**
 * Interface to lock / unlock tokens
 */
module.exports = async (efx, token, amount, duration) => {
  const currency = efx.CURRENCIES[token]

  // value we sending to the lockerContract
  const value = (amount * (10 ** currency.decimals))

  const args = [ value, duration ]

  const action = 'deposit'

  // In order to lock ETH we simply deposit ETH onto an address
  if (token === 'ETH') {
    return efx.eth.send(
      efx.contract.abi.locker,
      currency.lockerAddress,
      action,
      args,
      value
    )
  }

  // Other tokens must be approved before
  //
}
