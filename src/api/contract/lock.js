/**
 * Interface to lock / unlock tokens
 */
module.exports = async (efx, token, amount, duration) => {
  const currency = efx.CURRENCIES[token]

  // value we sending to the lockerContract
  const value = (amount * (10 ** currency.decimals))

  const action = 'deposit'

  // In order to lock tokens we call deposit with value and forTime
  const args = [
    value, // uint256 value
    duration // uint256 forTime
  ]

  // In order to lock ETH we simply send ETH to the lockerAddress
  if (token === 'ETH') {
    return efx.eth.send(
      efx.contract.abi.locker,
      currency.lockerAddress,
      action,
      args,
      value // send ETH to the contract
    )
  }

  return efx.eth.send(
    efx.contract.abi.locker,
    currency.lockerAddress,
    action,
    args
  )
}
