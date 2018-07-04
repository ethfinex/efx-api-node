module.exports = (efx, token, amount) => {
  return efx.contract.lock(token, amount, null, 'unlock')
}
