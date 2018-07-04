/**
 * The ABI for the wrapper token contract
 *
 */
module.exports = [
  {
    'constant': false,
    'inputs': [
      {
        'name': '_value',
        'type': 'uint256'
      },
      {
        'name': '_forTime',
        'type': 'uint256'
      }
    ],
    'name': 'deposit',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool'
      }
    ],
    'payable': true,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'v',
        'type': 'uint8'
      },
      {
        'name': 'r',
        'type': 'bytes32'
      },
      {
        'name': 's',
        'type': 'bytes32'
      },
      {
        'name': '_value',
        'type': 'uint256'
      },
      {
        'name': 'signatureValidUntilBlock',
        'type': 'uint256'
      }
    ],
    'name': 'withdraw',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
]
