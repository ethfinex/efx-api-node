const {signatureUtils, orderHashUtils} = require('@0x/order-utils')

module.exports = async (efx, order) => {
  const orderHash = orderHashUtils.getOrderHashHex(order)

  const signerType = efx.isMetaMask ? 'METAMASK' : 'DEFAULT'

  const signature = await signatureUtils.ecSignOrderHashAsync(
    efx.web3.currentProvider,
    orderHash,
    efx.get('account'),
    signerType
  )

  order.signature = signature

  /**
  const isValid = ZeroEx.isValidSignature(orderHash, signedOrder, efx.get('account').toLowerCase())

  console.log( "is_valid ->", isValid)
  **/

  return order
}
