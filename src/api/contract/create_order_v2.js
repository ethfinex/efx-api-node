const {assetDataUtils, generatePseudoRandomSalt} = require('@0xproject/order-utils')

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
    buyAmount = amount
    sellAmount = amount * price

    // console.log( "Buying " + amount + ' ' + buySymbol + " for: " + price + ' ' + sellSymbol )
  }

  if (amount < 0) {
    buyAmount = Math.abs(amount * price)
    sellAmount = Math.abs(amount)

    // console.log( "Selling " + Math.abs(amount) + ' ' + sellSymbol + " for: " + price + ' ' + buySymbol )
  }

  // console.log( "   buy amount: " + buyAmount + " " + buySymbol )
  // console.log( "  sell amount: " + sellAmount + " " + sellSymbol )

  let expiration
  expiration = Math.round((new Date()).getTime() / 1000)
  expiration += validFor || config.defaultExpiry

  // create order object
  const order = {
    makerAddress: efx.get('account').toLowerCase(),
    takerAddress: '0x0000000000000000000000000000000000000000',

    feeRecipientAddress: efx.config.ethfinexAddress.toLowerCase(),
    senderAddress: efx.config.ethfinexAddress.toLowerCase(),

    makerAssetAmount: web3.utils.toBN(
      Math.trunc(10 ** sellCurrency.decimals * sellAmount)
    ).toString(10),

    takerAssetAmount: web3.utils.toBN(
      Math.trunc(10 ** buyCurrency.decimals * buyAmount)
    ).toString(10),

    makerFee: web3.utils.toBN('0').toString(10),

    takerFee: web3.utils.toBN('0').toString(10),

    expirationTimeSeconds: web3.utils.toBN(expiration).toString(10),

    salt: generatePseudoRandomSalt(),

    makerAssetData: assetDataUtils.encodeERC20AssetData(sellCurrency.lockerAddress.toLowerCase()),

    takerAssetData: assetDataUtils.encodeERC20AssetData(buyCurrency.lockerAddress.toLowerCase()),

    exchangeAddress: config.exchangeContractAddress.toLowerCase(),
  }

  return order
}
