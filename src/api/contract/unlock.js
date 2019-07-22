const BigNumber = require('bignumber.js')
/**
 * Call unlock method on wrapper contract
 */
module.exports = async (efx, token, amount, nonce, signature) => {
  const currency = efx.config['0x'].tokenRegistry[token]

  // value we asking to unlock
  const value = (new BigNumber(10)).pow(currency.decimals).times(amount).integerValue(BigNumber.ROUND_FLOOR).toString()

  const action = 'withdraw'

  // get timestamp for depositLock
  const depositLock = await efx.contract.depositLock(token)

  // arguments for the contract call
  let args = [value]

  // no need to call releaseTokens
  if (Date.now() / 1000 > depositLock) {
    args = args.concat([0, '0x', '0x', 0])
  }

  // we need to call releaseTokens to fetch a signed permission to unlock
  if (Date.now() / 1000 < depositLock) {
    args = args.concat([signature.v, signature.r, signature.s, 9000000])
  }

  return efx.eth.send(
    efx.contract.abi.locker,
    currency.wrapperAddress,
    action,
    args
  )
}
