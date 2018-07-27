/**
 * Returns the unlockUntil
 */
module.exports = (efx, token) => {
  const currency = efx.CURRENCIES[token]

  const args = [
    efx.get('account') // address _owner
  ]

  const action = 'depositLock'

  // REVIEW: not sure if we will be able to read the contract array this way
  // TODO: Test it on ropsten
  return efx.eth.call(efx.contract.abi.locker, currency.lockerAddress, action, args)
}
