/**
 * Interface to lock / unlock tokens
 */
module.exports = async (efx, token, amount, duration, action = 'lock') => {
  const currency = efx.CURRENCIES[token]

  // arguments for contract's lock/unlock methods
  let args = [
    amount * (10 ** currency.decimals),
    duration
  ]

  if (action === 'lock') {
    if (token === 'ETH') {
      args.push({
        value: amount * (10 ** currency.decimals)
      })
    }
  } else {
    const {
      signature,
      unlockTill
    } = await efx.sign.lock(currency.address)

    const r = signature.r || 0
    const s = signature.s || 0
    const v = signature.v || 0

    args = [v, r, s, amount, unlockTill]
  }

  return efx.eth.call(efx, efx.contract.abi, currency.address, action, args)
}
