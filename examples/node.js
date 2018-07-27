// Please check ../test/index.js for all examples and tests

const EFX = require('..')

work = async () => {
  efx = await EFX()

  let response

  response = await efx.contract.locked('ETH')

  const locked = efx.web3.utils.fromWei(response)

  console.log( `You locked ${locked} ETH` )

  console.log("")

  console.log("efx.contract.lock('ETH', 0.01, 1)")

  // lock some more
  response = await efx.contract.lock('ETH', 0.01, 1)

  if(response.status){
    console.log( " - OK")
  } else {
    console.log( "Error:")
    console.log(response)
  }

  console.log("")

  console.log("efx.contract.unlock('ETH', 0.01)")

  // unlock some
  response = await efx.contract.unlock('ETH', 0.01)

  if(response.status){
    console.log( " - OK")
  } else {
    console.log( "Error:")
    console.log(response)
  }

}

work()

