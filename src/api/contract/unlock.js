/**
 * Call unlock method on wrapper contract
 */
module.exports = async (efx, token, amount) => {
  const currency = efx.CURRENCIES[token]

  // value we asking to unlock
  const value = amount * (10 ** currency.decimals)

  const {
    signature,
    unlockTill
  } = await efx.sign.lock(currency.address)

  const r = signature.r || 0
  const s = signature.s || 0
  const v = signature.v || 0

  const args = [v, r, s, value, unlockTill]

  const action = 'withdraw'

  return efx.eth.send(efx.contract.abi, currency.lockerAddress, action, args)
}
