/**
 *
 * A simple alias that specify an order when calling efx.getOrders method
 */
module.exports = async (efx, id, token, signature) => {
  return efx.getOrders(null, id, token, signature)
}
