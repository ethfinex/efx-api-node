const P = require('bluebird')
const { post } = require('request-promise')

module.exports = async (efx, token, duration = 25) => {
  const {web3, config} = efx

  const currency = efx.CURRENCIES[token]

  const getBlockNumber = P.promisify(web3.eth.getBlockNumber)

  const blockNumber = (await getBlockNumber()) + duration

  let payload = {
    address: config.account, // your ethereum address
    unlockUntil: blockNumber
  }

  if (token !== 'ETH') {
    payload.tokenAddress = currency.tokenAddress
  }

  const url = config.api // do we add anything to this path?

  const response = await post(url, efx.sign.request(payload))

  // response should return {
  //   signature: '0x...',
  //   unlockUntil: ''
  // }

  return response
}
