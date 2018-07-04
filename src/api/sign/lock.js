const P = require('bluebird')
const { post } = require('request-promise')

module.exports = async (efx, wrapperAddress, duration = 25) => {
  const {web3, config} = efx

  const getBlockNumber = P.promisify(web3.eth.getBlockNumber)

  const blockNumber = (await getBlockNumber()) + duration

  // POST request payload
  const payload = {
    address: config.account, // your ethereum address
    tokenAddress: wrapperAddress,
    unlockUntil: blockNumber
  }

  const url = config.api // do we add anything to this path?

  const response = await post(url, efx.sign.request(payload))

  // response should return {
  //   signature: '0x...',
  //   unlockUntil: ''
  // }

  return response
}
