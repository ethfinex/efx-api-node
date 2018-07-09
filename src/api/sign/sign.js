/**
 * Signs toSign assyncronously
 *
 * For more information, check:
 * https://web3js.readthedocs.io/en/1.0/web3-eth.html#sign
 */

module.exports = (efx, toSign) => {
  const { config, web3 } = efx

  return web3.eth.sign(toSign, config.account)
}
