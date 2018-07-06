/**
 * Exports a hash with currency information
 *
 */

// REVIEW: Will we have something like this or will it be pre-fetched
// by the client?
module.exports = {
  ETH: {
    decimals: 18,
    address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    lockerAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c'
  },

  USD: {
    decimals: 6,
    address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    lockerAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c'
  }
}
