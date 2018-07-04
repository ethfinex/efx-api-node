/*
 * Returns current network id and name
 * see:
 * https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#construction_worker-network-check
 *
 **/
const P = require('bluebird')

module.exports = async (efx) => {
  const get = P.promisify(efx.web3.version.getNetwork)

  const id = await get()

  const labels = {
    '1': 'mainnet',
    '2': 'morden',
    '3': 'ropsten',
    '4': 'Rinkeby',
    '42': 'Kovan'
  }

  return {
    id: id,
    name: labels[id] || 'unknown'
  }
}
