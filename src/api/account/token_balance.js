module.exports = (efx, token) => {
  const currency = efx.CURRENCIES[token]
  const action = 'balanceOf'
  const args = [ efx.get('account') ]

  return efx.eth.call(efx.contract.abi.token, currency.tokenAddress, action, args)
}
