/**
 * Finds and returns an account based on given id.
 *
 * id - Can be an index of the array such as 0 or an address
 **/
module.exports = async (efx, id) => {
  // check for ethereum accounts and select a default one
  const accounts = await efx.web3.eth.getAccounts()

  if (!isNaN(id)) {
    if (!accounts[id]) {
      console.error('Error: You have no account at index:', +id)
    }

    return accounts[id]
  }

  for (let account in accounts) {
    if (account === id) {
      return account
    }
  }

  return null
}
