// check truffle-hdwallet-provider on github for more information
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("Web3")

// Please check ../test/index.js for all examples and tests
const EFX = require('..')

const privateKey = '' // Account's private key
const infuraKey = ''  // Your Infura API KEY
const infuraURL = 'https://kovan.infura.io/v3/' + infuraKey

work = async () => {

  const provider = new HDWalletProvider(privateKey, infuraURL)
  const web3 = new Web3(provider)

  const testConfig = {
    api: 'https://staging-api.deversifi.com/v1/trading'
  }

  efx = await EFX(web3, testConfig)

  console.log("")

  // submit an order to SELL 0.01 ETH for 300 USD
  console.log("getFeeRate('ETHUSD', 200, 200)")

  const response = await efx.getFeeRate('ETHUSD', 200, 200)

  if(response){
    console.log(` - Fee Rates: #${JSON.stringify(response, null, 2)}`)
  } else {
    console.log("Error:")
    console.log(response)
  }

}

work()

