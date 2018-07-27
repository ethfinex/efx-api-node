/**
 * Call unlock method on wrapper contract
 */
module.exports = async (efx, token, amount) => {
  const currency = efx.CURRENCIES[token]

  // value we asking to unlock
  const value = amount * (10 ** currency.decimals)

  const action = 'withdraw'

  const response = await efx.releaseTokens(token)

  const sig = response.releaseSignature

  const args = [value, sig.v, sig.r, sig.s, response.unlockUntil]

  return efx.eth.send(
    efx.contract.abi.locker,
    currency.lockerAddress,
    action,
    args
  )
}
