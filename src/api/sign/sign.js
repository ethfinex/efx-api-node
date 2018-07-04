/**
 * Signs toSign assyncronously
 *
 * For more information, checl:
 * https://web3js.readthedocs.io/en/1.0/web3-eth.html#sign
 */

const P = require('bluebird')

module.exports = (client, toSign) => {
  const { config, web3 } = client

  const sign = P.promisify(web3.eth.sign)

  try {
    return sign(toSign, config.account)
  } catch (error) {
    // REVIEW: shall we deal with basic warnings here such as
    // - "Account is unlocked"
    throw error
  }
}
