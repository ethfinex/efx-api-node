/**
 * Unlocks an account for given duration
 */
module.exports = (efx, password, duration = 60) => {
  const { web3, config } = efx

  return web3.eth.personal.unlockAccount(
    config.account,
    password
  )
}
