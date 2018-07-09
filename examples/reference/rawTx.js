const ejsTx = require('ethereumjs-tx')

const privateKey = Buffer.from(opts.privateKey, 'hex')

const txParams = {
  nonce: opts.nonce,
  gasPrice: web3.toHex(opts.gasPrice),
  gasLimit: web3.toHex(opts.gas),
  to: tx.address,
  value: web3.toHex(tx.value),
  data: opts.data ? web3.toHex(opts.data) : '0x00',
  chainId: conf.chainId
}
console.log(txParams)

const etx = new ejsTx(txParams)
etx.sign(privateKey)
const serializedTx = etx.serialize().toString('hex')
console.log(serializedTx)

web3.eth.sendRawTransaction(raw, cb)
