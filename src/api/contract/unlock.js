/**
 * Call unlock method on wrapper contract
 */
module.exports = async (efx, token, amount) => {
  const currency = efx.CURRENCIES[token]

  // value we asking to unlock
  const value = amount * (10 ** currency.decimals)

  const response = await efx.releaseTokens(token)

  const sig = response.signature.toString(16)

  const r = sig.slice(2, 66)
  const s = sig.slice(66, 130)
  const v = parseInt(sig.slice(130, 132), 16).toString(10)

  const args = [v, r, s, value, response.unlockTill]

  const action = 'withdraw'

  if (token === 'ETH') {

  } else {
    return efx.eth.send(
      efx.contract.abi,
      currency.lockerAddress,
      action,
      args
    )
  }
}
