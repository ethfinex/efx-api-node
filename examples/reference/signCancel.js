// Test Script For Generating Cancellation Requests with efxapi
// Option 1. Raw Private Key Signing
// Option 2. Web3 Signing

const utils = require('ethereumjs-util')

const orderId = 75;

const Web3 = require('web3')
const web3 = new Web3(null)

////// 1. Signing via exposed private key (for easy testing with no local node)
const testPrivateKey = '0x-----'
const msg = utils.bufferToHex(utils.sha3(orderId.toString(16))).slice(2)
const res = web3.eth.accounts.sign(msg, testPrivateKey)
console.log('Cancelation signature for order', orderId, ': ', res.signature)

console.log({
  "signature": res.signature,
  "orderId": orderId,
  "ethOrderMethod": "0x"
})

console.log(res.signature)

////// 2. Signing using unlocked wallet with web3
/* Requires a local node with unlocked account to generate signature successfully

function signCancel (orderID) {
    web3.eth.getAccounts((err, accounts) => {
      web3.eth.sign('0x'+orderID.toString(16), accounts[0], (err, res) => {
        if (err) { console.log(err) }
        console.log('Cancelation signature for order', orderID, ': ', res)
      })
    })
}

signCancel(orderId)

*/
console.log(web3.eth.accounts.recover(msg, res.signature));
/*
const sig = res.signature

const r = sig.slice(2, 66)
const s = sig.slice(66,130)
const v = parseInt(sig.slice(130, 132),16).toString(10)
console.log(v)

var pub = utils.ecrecover(new Buffer(msg, 'hex'), v, new Buffer(r, 'hex'), new Buffer(s, 'hex'));
console.log(utils.bufferToHex(utils.pubToAddress(pub)))
*/
