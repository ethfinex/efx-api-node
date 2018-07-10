module.exports = (efx, abi, address, action, args, value = 0, callback) => {
  const { web3 } = efx

  const contract = new web3.eth.Contract(abi, address)

  if (callback) {
    return contract.methods[action](...args).send({
      from: efx.config.account,
      value: value
    }, callback)
  }

  // return promise
  return contract.methods[action](...args).send({
    from: efx.config.account,
    value: value
  })
}
