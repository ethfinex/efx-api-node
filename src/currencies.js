/**
 * Exports a hash with currency information
 *
 */

// REVIEW: Will we have something like this or will it be pre-fetched
// by the client?
module.exports = {
  ETH: {
    decimals: 18,
    tokenAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    lockerAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c' // weth contract
  },
  USD: {
    decimals: 6,
    tokenAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    lockerAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c'
  },
  ZRX: {
    decimals: 18,
    tokenAddress: '0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570',
    lockerAddress: '0xafb7c8b4a5abc354afdac2fdc6966f060b11f928'
  }

}
