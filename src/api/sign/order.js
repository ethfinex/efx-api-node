const {signatureUtils, orderHashUtils} = require('@0x/order-utils')

module.exports = async (efx, order) => {
  const orderHash = orderHashUtils.getOrderHashHex(order)

  const signature = await signatureUtils.ecSignHashAsync(
    efx.web3.currentProvider,
    orderHash,
    efx.get('account')
  )

  order.signature = signature

  /**
  const isValid = signatureUtils.isValidSignatureAsync(orderHash, signedOrder, efx.get('account').toLowerCase())

  console.log( "is_valid ->", isValid)
  **/

  return order
}
