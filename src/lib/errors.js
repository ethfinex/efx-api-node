module.exports = {

  ERR_MAKERTOKEN_ADDRESS_INVALID: `
    The 'maker' token address provided in the 0x order JSON did not 
    match the pair specified by the API call.
  `,
  ERR_TAKERTOKEN_ADDRESS_INVALID: `
    The 'taker' token address provided in the 0x order JSON did not
    match the pair specified by the API call.
  `,
  ERR_MAKERTOKEN_AMOUNT_INVALID: `
    The specified 0x order JSON maker amount did not match with the 
    amount and price specified in the API call.
  `,
  ERR_TAKERTOKEN_AMOUNT_INVALID: `
    The specified 0x order JSON taker amount did not match with the 
    amount and price specified in the API call.
  `,
  ERR_0X_SIGNATURE_INVALID: `
    The 0x signed order hash was invalid.
  `,
  ERR_0X_FEE_RECIPIENT_INVALID: `
    The fee recipient address was not specified as Ethfinex.
  `,
  ERR_0X_TAKER_INVALID: `
    The taker address for the trade was not specified as Ethfinex.
  `,
  ERR_0X_EXCHANGE_INVALID: `
    The exchange contract address for the trade was not specified correctly.
  `,
  ERR_0X_EXPIRED: `
    The order expiration date was too soon, or already passed.
  `,
  ERR_0X_BELOW_MIN_SIZE: `
    The order size was below the minimum.
  `,
  ERR_0X_LOCK_TIME_INSUFFICIENT: `
    The order expires after the time lock on the tokens is released.
  `,
  ERR_0X_MAKER_INSUFFICIENT_BALANCE: `
    Not enough balance of time locked tokens to place the order.
  `,
  ERR_UNLOCK_TOO_LONG: `
    The requested unlock signature is valid for an excessive time period.
  `
}
