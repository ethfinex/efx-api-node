const {ZeroEx} = require('0x.js')

module.exports = async (efx, order) => {
  const orderHash = ZeroEx.getOrderHashHex(order)

  // remove 0x from the hash
  // let signature = await efx.sign(orderHash)

  const network = await efx.eth.getNetwork()

  const zeroEx = new ZeroEx(efx.web3.currentProvider, {networkId: network.id})

  const signedOrder = await zeroEx.signOrderHashAsync(orderHash, efx.get('account'), efx.isMetaMask)

  order.ecSignature = signedOrder

  /**
  const isValid = ZeroEx.isValidSignature(orderHash, signedOrder, efx.get('account').toLowerCase())

  console.log( "is_valid ->", isValid)
  **/

  return order
}
