module.exports = async (efx, orderId) => {
  const signature = await efx.sign(orderId.toString(16))

  return efx.cancelSignedOrder(orderId, signature)
}
