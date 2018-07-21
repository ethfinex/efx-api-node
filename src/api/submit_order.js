module.exports = async (efx, symbol, amount, price, gid, cid) => {
  if (!(symbol && amount && price)) {
    throw new Error('order, symbol, amount and price are required')
  }

  const order = efx.contract.createOrder(symbol, amount, price)

  const signedOrder = await efx.sign.order(order)

  return efx.submitSignedOrder(signedOrder, symbol, amount, price, gid, cid)
}
