const {ZeroEx} = require('0x.js')
const BigNumber = require('bignumber.js');

module.exports = (efx, symbol, amount, price, validFor) => {
  const { web3, config } = efx

  // symbols are always 3 letters
  const symbolOne = symbol.substr(0, symbol.length - 3)
  const symbolTwo = symbol.substr(-3)

  const buySymbol = amount > 0 ? symbolOne : symbolTwo
  const sellSymbol = amount > 0 ? symbolTwo : symbolOne

  const sellCurrency = efx.config['0x'].tokenRegistry[sellSymbol]
  const buyCurrency = efx.config['0x'].tokenRegistry[buySymbol]

  let buyAmount, sellAmount

  if (amount > 0) {
    buyAmount = (new BigNumber(10 ** buyCurrency.decimals)).times(amount)
    sellAmount = (new BigNumber(10 ** sellCurrency.decimals)).times(amount).times(price)

    // console.log( "Buying " + amount + ' ' + buySymbol + " for: " + price + ' ' + sellSymbol )
  }

  if (amount < 0) {
    buyAmount = (new BigNumber(10 ** buyCurrency.decimals)).times(amount).times(price).abs()
    sellAmount = (new BigNumber(10 ** sellCurrency.decimals)).times(amount).abs()

    // console.log( "Selling " + Math.abs(amount) + ' ' + sellSymbol + " for: " + price + ' ' + buySymbol )
  }

  // console.log( "   buy amount: " + buyAmount + " " + buySymbol )
  // console.log( "  sell amount: " + sellAmount + " " + sellSymbol )

  let expiration
  expiration = Math.round((new Date()).getTime() / 1000)
  expiration += validFor || config.defaultExpiry

  // create order object
  const order = {
    expirationUnixTimestampSec: web3.utils.toBN(expiration).toString(10),
    feeRecipient: efx.config['0x'].ethfinexAddress.toLowerCase(),

    maker: efx.get('account').toLowerCase(),
    makerFee: web3.utils.toBN('0'),
    makerTokenAddress: sellCurrency.wrapperAddress.toLowerCase(),
    makerTokenAmount: sellAmount.toString(10),

    salt: ZeroEx.generatePseudoRandomSalt(),
    taker: efx.config['0x'].ethfinexAddress.toLowerCase(),
    takerFee: web3.utils.toBN('0'),
    takerTokenAddress: buyCurrency.wrapperAddress.toLowerCase(),
    takerTokenAmount: buyAmount.toString(10),

    exchangeContractAddress: efx.config['0x'].exchangeAddress.toLowerCase()
  }

  return order
}
