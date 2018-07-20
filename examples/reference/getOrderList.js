const ejUtil = require('ethereumjs-util')
const token = ((Date.now() / 1000) + 30) + ''

const request = require('request')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const testPrivateKey = '0x768ee0b2dd825f84dbf8f7a6c896e453f0392c78551c4e9b6d7e027afcca380c'
const res = web3.eth.accounts.sign(token, testPrivateKey)

const apiOrder = {
  signature: res.signature,
  token: token,
  protocol: '0x'
}
request({
  method: 'POST',
  url: 'https://staging.bitfinex.com:2998/trustless/getOrderList',
  json: apiOrder
}, (error, res, body) => {

  if(error) {
    console.log( "error" )
    console.log( error )
    return
  }

  if(body){
    console.log("body")
    console.log(body)
  } else {
    console.log("res")
    console.log(res)
  }
})
