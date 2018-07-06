module.exports = (efx, wrapperAbi, address, action, args, value = 0) => {
  const { web3 } = efx

  const contract = new web3.eth.Contract(wrapperAbi, address)

  // REVIEW: Shall we use estimateGas here? maybe show the user what the gas
  // will be?
  // see: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-estimategas
  return contract.methods[action](...args).send({
    from: efx.config.account,
    value: value
  })
}
