/**
 * Interface to lock / unlock tokens
 */
module.exports = async (efx, token, amount, duration) => {
  const currency = efx.CURRENCIES[token]

  // value we sending to the lockerContract
  const value = amount * (10 ** currency.decimals)

  const args = [ value, duration ]

  const action = 'deposit'

  return efx.eth.send(efx.contract.abi, currency.lockerAddress, action, args, value)
}
