// Please check ../test/index.js for all examples and tests

const EFX = require('..')

const _ = require('lodash')
const P = require('bluebird')

let addresses = []

submitBuyOrder = async (efx, account, price) => {
}

submitSellOrder = async (efx, account, price) => {
  await efx.account.select(account)

  await efx.account.unlock('password')

  const amount = 25 / price * -1

  response = await efx.submitOrder('ETHUSD', amount, price)

  console.log( `Submited sell ${amount} ETH for ${price} on behalf of ${account}`)

  if(response.error){
    console.log( " - error", response.error)
  } else {
    console.log( " - OK")
  }
}

cancelAllOrders = async(efx, account) => {

  await efx.account.select(account)

  await efx.account.unlock('password')

  // Cancel all orders
  response = await efx.getOrders()

  console.log(`Found ${response.length} orders from ${account}`)

  for(const order of response){
    console.log("")

    console.log( "cancel order #", order.id )

    try {
      response = await efx.cancelOrder(order.id)
      console.log(" - OK")
    } catch(e) {
      //console.log( 'e ->', e)
      console.log( "error:", e.response.body )
    }
  }
}

work = async () => {
  // assuming you have a provider running at:
  // http://localhost:8545
  const efx = await EFX()

  const accounts = await efx.web3.eth.getAccounts()

  let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  indexes = _.shuffle(indexes)

  const INITIAL_PRICE = 1000

  // send 5 orders, sequentially not in parallel
  await submitSellOrder(efx, accounts[indexes[0]], INITIAL_PRICE + 0 )
  await submitSellOrder(efx, accounts[indexes[1]], INITIAL_PRICE + 1 )
  await submitSellOrder(efx, accounts[indexes[2]], INITIAL_PRICE + 2 )
  await submitSellOrder(efx, accounts[indexes[3]], INITIAL_PRICE + 3 )
  await submitSellOrder(efx, accounts[indexes[4]], INITIAL_PRICE + 4 )

  console.log( "-------------" )
  console.log( "sent all sells" )
  console.log( "" )

  await cancelAllOrders(efx, accounts[indexes[0]], INITIAL_PRICE + 0 )
  await cancelAllOrders(efx, accounts[indexes[1]], INITIAL_PRICE + 1 )
  await cancelAllOrders(efx, accounts[indexes[2]], INITIAL_PRICE + 2 )
  await cancelAllOrders(efx, accounts[indexes[3]], INITIAL_PRICE + 3 )
  await cancelAllOrders(efx, accounts[indexes[4]], INITIAL_PRICE + 4 )

  console.log( "-------------" )
  console.log( "cancelled all sells" )
  console.log( "" )


  return

  // WIP
  const buys = Promise.all([
    submitBuyOrder(efx, accounts[indexes[1]], INITIAL_PRICE - 4 ),
    submitBuyOrder(efx, accounts[indexes[2]], INITIAL_PRICE - 3 ),
    submitBuyOrder(efx, accounts[indexes[3]], INITIAL_PRICE - 2 ),
    submitBuyOrder(efx, accounts[indexes[4]], INITIAL_PRICE - 1 ),
    submitBuyOrder(efx, accounts[indexes[5]], INITIAL_PRICE + 0 )
  ])

  await buys

  console.log( "-------------" )
  console.log( "sent all buys" )
}

work()


