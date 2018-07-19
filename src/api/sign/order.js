const {ZeroEx} = require('0x.js')

module.exports = async (efx, order) => {
  const { web3, config } = efx

  const orderHash = ZeroEx.getOrderHashHex(order)

  // remove 0x from the hash
  let signature = await efx.sign(orderHash.slice(2))

  const signedOrder = Object.assign({}, order, {ecSignature: signature})

  return signedOrder
}
