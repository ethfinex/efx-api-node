module.exports = (efx, wrapperAbi, address, action, args) => {
  const { web3 } = efx

  const contract = new web3.eth.Contract(wrapperAbi, address)

  return contract.methods[action](...args).call({
    from: efx.config.account
  })
}
