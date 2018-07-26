module.exports = async (efx, abi, address, action, args, value = 0) => {
  const { web3 } = efx

  const contract = new web3.eth.Contract(abi, address)

  const method = contract.methods[action](...args)

  const estimatedGas = await method.estimateGas({
    from: efx.get('account'),
    value: value
  })

  return method.send({
    from: efx.get('account'),
    value: value,
    gas: estimatedGas
  })
}
