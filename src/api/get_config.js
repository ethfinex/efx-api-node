const { post } = require('request-promise')

module.exports = async (efx) => {
  const url = efx.config.api + '/r/get/conf'

  const exchangeConf = {
    '0x': {
      'protocol': '0x',
      'minOrderTime': 300,
      'tokenRegistry': {
        'ETH': {
          'decimals': 18,
          'wrapperAddress': '0xaa7427d8f17d87a28f5e1ba3adbb270badbe1011',
          'minOrderSize': 0.2
        },
        'USD': {
          'decimals': 6,
          'wrapperAddress': '0x1a9b2d827f26b7d7c18fec4c1b27c1e8deeba26e',
          'tokenAddress': '0xdac17f958d2ee523a2206206994597c13d831ec7',
          'minOrderSize': 50,
          'settleSpread': 0.00074
        },
        'OMG': {
          'decimals': 18,
          'wrapperAddress': '0x60f8526f09caaf0008187945ccd88bc43790042c',
          'tokenAddress': '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
          'minOrderSize': 20
        },
        'ZRX': {
          'decimals': 18,
          'wrapperAddress': '0xcf67d7a481ceeca0a77f658991a00366fed558f7',
          'tokenAddress': '0xe41d2489571d322189246dafa5ebde1f4699f498',
          'minOrderSize': 150
        },
        'NEC': {
          'decimals': 18,
          'wrapperAddress': '0xc94ec1f80c4423ae0cecb4296b5de530219f0f9d',
          'tokenAddress': '0xcc80c051057b774cd75067dc48f8987c4eb97a5e',
          'minOrderSize': 50
        },
        'SAN': {
          'decimals': 18,
          'wrapperAddress': '0xb0abd4cc5195560209492b6854c666d7cff8c03c',
          'tokenAddress': '0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098',
          'minOrderSize': 50
        },
        'SNT': {
          'decimals': 18,
          'wrapperAddress': '0x8aa72dd6045505836f643b39b82e70fd705f9686',
          'tokenAddress': '0x744d70fdbe2ba4cf95131626614a1763df805b9e',
          'minOrderSize': 2000
        },
        'EDO': {
          'decimals': 18,
          'wrapperAddress': '0xab056a8119bb91ca50631bd319ee3df654bebfa2',
          'tokenAddress': '0xced4e93198734ddaff8492d525bd258d49eb388e',
          'minOrderSize': 60
        },
        'FUN': {
          'decimals': 8,
          'wrapperAddress': '0xb33ce6b1e48f450b4c6d4c0a3f281237eeea2dec',
          'tokenAddress': '0x419d0d8bdd9af5e606ae2232ed285aff190e711b',
          'minOrderSize': 12000
        },
        'REP': {
          'decimals': 18,
          'wrapperAddress': '0x1488f99d305990694e19b3e72f6f0307cfa1df4e',
          'tokenAddress': '0x1985365e9f78359a9b6ad760e32412f4a445e862',
          'minOrderSize': 3
        },
        'MKR': {
          'decimals': 18,
          'wrapperAddress': '0x38ae374ecf4db50b0ff37125b591a04997106a32',
          'tokenAddress': '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
          'minOrderSize': 0.08
        },
        'DAI': {
          'decimals': 18,
          'wrapperAddress': '0xd9ebebfdab08c643c5f2837632de920c70a56247',
          'tokenAddress': '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
          'minOrderSize': 50
        },
        'BAT': {
          'decimals': 18,
          'wrapperAddress': '0xe82cfc4713598dc7244368cf5aca1b102a04ce33',
          'tokenAddress': '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
          'minOrderSize': 160
        },
        'NIO': {
          'decimals': 0,
          'wrapperAddress': '0x680bf2eebf0ad9b183ac2ff88d16f5a4e41480e9',
          'tokenAddress': '0x5554e04e76533e1d14c52f05beef6c9d329e1e30',
          'minOrderSize': 7000
        },
        'SPK': {
          'decimals': 18,
          'wrapperAddress': '0x70b04d0684ea9dc0c8e244e0a1453744350f3864',
          'tokenAddress': '0x42d6622dece394b54999fbd73d108123806f6a18',
          'minOrderSize': 4000
        },
        'ENJ': {
          'decimals': 18,
          'wrapperAddress': '0x7d5a230dd6b5cd24308566e8e4074c1d615862b3',
          'tokenAddress': '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
          'minOrderSize': 400
        },
        'TKN': {
          'decimals': 8,
          'wrapperAddress': '0x3b4d5a7dd02dc866dd60aeb872dfbfe37564c684',
          'tokenAddress': '0xaaaf91d9b90df800df4f55c205fd6989c977e73a',
          'minOrderSize': 110
        },
        'UDC': {
          'decimals': 6,
          'wrapperAddress': '0x69391cca2e38b845720c7deb694ec837877a8e53',
          'tokenAddress': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          'minOrderSize': 50
        },
        'TSD': {
          'decimals': 18,
          'wrapperAddress': '0xeb52a95695ffa4cf411b804455287f0717884899',
          'tokenAddress': '0x0000000000085d4780b73119b644ae5ecd22b376',
          'minOrderSize': 50
        }
      },
      'ethfinexAddress': '0x61b9898c9b60a159fc91ae8026563cd226b7a0c1',
      'exchangeAddress': '0x4f833a24e1f95d70f028921e27040ca56e09ab0b',
      'exchangeSymbols': ['tETHUSD', 'tZRXUSD', 'tZRXETH', 'tZRXDAI', 'tOMGUSD', 'tOMGETH', 'tOMGDAI', 'tSANUSD', 'tSANETH', 'tSNTUSD', 'tSNTETH', 'tEDOUSD', 'tEDOETH', 'tFUNUSD', 'tFUNETH', 'tREPUSD', 'tREPETH', 'tMKRUSD', 'tMKRETH', 'tMKRDAI', 'tBATUSD', 'tBATETH', 'tNIOUSD', 'tNIOETH', 'tSPKUSD', 'tSPKETH', 'tDAIUSD', 'tDAIETH', 'tENJETH', 'tENJUSD', 'tUDCUSD', 'tTSDUSD', 'tTKNUSD', 'tTKNETH']
    }
  }

  efx.config = Object.assign({}, efx.config, exchangeConf)

  return exchangeConf
};
