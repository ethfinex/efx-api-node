const {ZeroEx} = require('0x.js')

module.exports = (efx, symbol, amount, price) => {
  const { web3, config } = efx

  // symbols are always 3 letters
  const symbolOne = symbol.substr(0, symbol.length - 3)
  const symbolTwo = symbol.substr(-3)

  const buySymbol = amount > 0 ? symbolOne : symbolTwo
  const sellSymbol = amount > 0 ? symbolTwo : symbolOne

  const sellCurrency = efx.CURRENCIES[sellSymbol]
  const buyCurrency = efx.CURRENCIES[buySymbol]

  let buyAmount, sellAmount

  if (amount > 0) {
    buyAmount = amount
    sellAmount = amount * price

    //console.log( "Buying " + amount + ' ' + buySymbol + " for: " + price + ' ' + sellSymbol )
  }

  if (amount < 0) {
    buyAmount = Math.abs(amount * price)
    sellAmount = Math.abs(amount)

    //console.log( "Selling " + Math.abs(amount) + ' ' + sellSymbol + " for: " + price + ' ' + buySymbol )
  }

  // console.log( "   buy amount: " + buyAmount + " " + buySymbol )
  // console.log( "  sell amount: " + sellAmount + " " + sellSymbol )

  let expiration
  expiration = Math.round((new Date()).getTime() / 1000)
  expiration += (efx.config.defaultExpiry || 60) * 60

  // create order object
  const order = {
    expirationUnixTimestampSec: web3.utils.toBN(expiration).toString(10),
    feeRecipient: efx.config.ethfinexAddress.toLowerCase(),

    maker: efx.get('account').toLowerCase(),
    makerFee: web3.utils.toBN('0'),
    makerTokenAddress: sellCurrency.lockerAddress.toLowerCase(),
    makerTokenAmount: web3.utils.toBN(
      Math.trunc(10 ** sellCurrency.decimals * sellAmount)
    ).toString(10),

    salt: ZeroEx.generatePseudoRandomSalt(),
    taker: config.ethfinexAddress.toLowerCase(),
    takerFee: web3.utils.toBN('0'),
    takerTokenAddress: buyCurrency.lockerAddress.toLowerCase(),
    takerTokenAmount: web3.utils.toBN(
      Math.trunc(10 ** buyCurrency.decimals * buyAmount)
    ).toString(10),

    exchangeContractAddress: config.exchangeContractAddress.toLowerCase()
  }

  return order
}
