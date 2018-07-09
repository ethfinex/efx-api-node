module.exports = (efx, abi, address, action, args, value = 0) => {
  const { web3 } = efx

  const contract = new web3.eth.Contract(abi, address)

  return contract.methods[action](...args).send({
    from: efx.config.account,
    value: value
  })
}
