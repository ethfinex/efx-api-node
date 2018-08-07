module.exports = {

  api: 'https://test.ethfinex.com/trustless/v1',

  ethfinexAddress: '0x9faf5515f177f3a8a845d48c19032b33cc54c09c',

  // kovan address
  // exchangeContractAddress: '0x4d412AE6e3Ad6c4458dA0feed7eA8A5EdAFD6603',

  // mainnet address
  // exchangeContractAddress: '0x651aa5ea257af3d6fd08aedca8c5a446edb7b7a6',

  // ropsten address
  exchangeContractAddress: '0x67799a5e640bc64ca24d3e6813842754e546d7b1',

  // default expire time for orders, in seconds
  defaultExpiry: 3600,
  defaultProvider: 'http://localhost:8545',
  account: 0 // account to use, can be an index or an address

}
