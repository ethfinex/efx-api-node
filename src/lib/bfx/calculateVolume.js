const getUSDPrice = require('./getUSDPrice')

module.exports = async (symbol, amount, price) => {
  let baseSymbol, quoteSymbol
  if (_.includes(symbol, ':')) {
    [baseSymbol, quoteSymbol] = _.split(symbol, ':', 2)
  } else {
    baseSymbol = symbol.substr(0, symbol.length - 3)
    quoteSymbol = symbol.substr(-3)
  }

  const quoteSymbolPrice = await getUSDPrice(quoteSymbol)

  // long or short the volume will be the same
  amount = Math.abs(amount)

  return amount * price * quoteSymbolPrice
}