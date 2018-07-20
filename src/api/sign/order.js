const {ZeroEx} = require('0x.js')

module.exports = async (efx, order) => {
  const { web3, config } = efx

  const orderHash = ZeroEx.getOrderHashHex(order)

  // remove 0x from the hash
  //let signature = await efx.sign(orderHash)

  const network = await efx.eth.getNetwork()

  const zeroEx = new ZeroEx(web3.currentProvider, {networkId: network.id })

  const signedOrder = await zeroEx.signOrderHashAsync(orderHash, config.account )

  order.ecSignature = signedOrder

  /**
  const isValid = ZeroEx.isValidSignature(orderHash, signedOrder, config.account.toLowerCase())

  console.log( "is_valid ->", is_valid)
  */

  return order
}
