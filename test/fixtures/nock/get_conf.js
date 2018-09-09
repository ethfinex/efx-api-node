const nock = require('nock')

module.exports = () => {
  const apiResponse = {
    "0x":{
        "minOrderTime":300,
        "tokenRegistry":{
          "ETH":{
              "decimals":18,
              "wrapperAddress":"0x965808e7f815cfffd4c018ef2ba4c5a65eba087e",
              "minOrderSize":0.02
          },
          "USD":{
              "decimals":6,
              "wrapperAddress":"0x83e42e6d1ac009285376340ef64bac1c7d106c89",
              "tokenAddress":"0x0736d0c130b2ead47476cc262dbed90d7c4eeabd",
              "minOrderSize":10
          }
        },
        "ethfinexAddress":"0x9faf5515f177f3a8a845d48c19032b33cc54c09c",
        "exchangeAddress":"0x67799a5e640bc64ca24d3e6813842754e546d7b1",
        "exchangeSymbols":[
          "tETHUSD"
        ]
    }
  }

  nock('https://test.ethfinex.com:443', {"encodedQueryParams":true})
    .post('/trustless/v1/r/get/conf', {})
    .reply(200, apiResponse)
}
