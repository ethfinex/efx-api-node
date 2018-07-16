// TODO: If the user has multiple accounts he must provide an account ID
// to be used by this client
//
// or we can have a method to choose the current account??
module.exports = {

  api: 'https://api.ethfinex.com/trustless',

  ethfinexAddress: '0x9faf5515f177f3a8a845d48c19032b33cc54c09c',

  exchangeContractAddress: '0x0000000000000000000000000000000000000000',

  defaultExpiry: 60,
  defaultProvider: 'http://localhost:8545',
  account: 0 // account to use, can be an index or an address

}
