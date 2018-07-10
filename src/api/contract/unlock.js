/**
 * Call unlock method on wrapper contract
 */
module.exports = async (efx, token, amount) => {
  const currency = efx.CURRENCIES[token]

  // value we asking to unlock
  const value = amount * (10 ** currency.decimals)

  const action = 'withdraw'

  let args = []

  if (token === 'ETH') {
    args = [value]

    return efx.eth.send(
      efx.contract.abi.weth,
      currency.lockerAddress,
      action,
      args
    )
  }

  const response = await efx.releaseTokens(token)

  const sig = response.signature.toString(16)

  const r = sig.slice(2, 66)
  const s = sig.slice(66, 130)
  const v = parseInt(sig.slice(130, 132), 16).toString(10)

  args = [v, r, s, value, response.unlockTill]

  return efx.eth.send(
    efx.contract.abi.locker,
    currency.lockerAddress,
    action,
    args
  )
}
