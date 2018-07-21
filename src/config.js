// TODO: If the user has multiple accounts he must provide an account ID
// to be used by this client
//
// or we can have a method to choose the current account??
module.exports = {

  api: 'https://api.ethfinex.com/trustless',

  ethfinexAddress: '0x9faf5515f177f3a8a845d48c19032b33cc54c09c',

  // kovan address
  // exchangeContractAddress: '0x4d412AE6e3Ad6c4458dA0feed7eA8A5EdAFD6603',

  // ropsten address
  exchangeContractAddress: '0x68ce3e415adcf280b5456ec82142030af54fda58',

  defaultExpiry: 60,
  defaultProvider: 'http://localhost:8545',
  account: 0 // account to use, can be an index or an address

}
