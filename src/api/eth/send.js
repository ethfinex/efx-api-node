module.exports = async (efx, abi, address, action, args, value = 0) => {
  const { web3 } = efx

  const contract = new web3.eth.Contract(abi, address)

  const method = contract.methods[action](...args)

  const estimatedGas = await method.estimateGas({
    from: efx.config.account
  })

  return method.send({
    from: efx.config.account,
    value: value,
    gas: estimatedGas
  })
}
