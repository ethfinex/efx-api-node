/**
 * Unlocks an account for given duration
 *
 * Implementation based on:
 * https://github.com/ethereum/web3.js/issues/986
 */
module.exports = (efx, password, duration = 600) => {
  const { web3, config } = efx

  return web3.eth.personal.unlockAccount(config.account, password, duration)
}
