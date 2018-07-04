module.exports = (efx, wrapperAbi, address, action, args) => {
  const { web3 } = efx

  return new Promise((resolve, reject) => {
    const contract = new web3.eth.Contract(wrapperAbi).at(address)

    contract[action](...args, (error, result) => {
      if (error) return reject(error)

      resolve(result)
    })
  })
}
