# Ethfinex Trading API for Node.JS

[![Build Status](https://travis-ci.org/hems/efx-api-node.svg?branch=master)](https://travis-ci.org/hems/efx-api-node)

A Node.JS reference implementation of the Ethfinex API

 - API Documentation: [https://docs.ethfinex.com/v2/reference](https://docs.ethfinex.com/v2/reference)

## Installing

```bash
  npm i efx-api-node
```

Alternatively on the browser you can use the standalone build
```html
<script src="http://path/to/dist/efx.js"></script>
```
## Usage

### Create your efx-api-node instance

 - running on node.js context
```js
const EFX = require('efx-api-node')

const web3 = new EFX.Web3(/*your web3 provider*/)

const efx = await EFX( web3 )
```

 - running on browser context with window.web3 available
```js
const EFX = require('efx-api-node')

const efx = await EFX() // we will automatically use your web3.currentProvider
```

 - running standalone build on browser without window.web3 available
```html
<script src="../dist/efx.js"></script>

<script>
  web3 = new EFX.Web3(/*your web3 provider*/)
  efx  = await EFX(web3)
</script>
```

### Locking tokens

Before locking tokens you must have locking approve the LockerContract move
tokens

```js

const token = 'ZRX'

efx.contract.approve(token)

```

Once you have approved, you can simply call .lock for locking your tokens
into the locker address.

```js

const token = 'ZRX'
const amount = 0.001
const forTime = 5

const response = await efx.contract.lock(token, amount, forTime)

```

### Unlocking tokens

```js

const token = 'ZRX'
const amount = 0.001

const response = await efx.contract.unlock(token, amount, forTime)

```

### Submitting a buy order

```js

const symbol = 'ETHUSD'
const amount = 1
const price = 100

efx.submitOrder(symbol, amount, price)

```

### Submitting a sell order

```js

const symbol = 'ETHUSD'
const amount = -1
const price = 100

const orderId = await efx.submitOrder(symbol, amount, price)

```

### Getting all orders

```js

const orders = await efx.getOrderList()

```

### Getting an order

```js

const id = 1

const order = await efx.getOrder(id)

```

## Developing

### 1. Setup

 - `git clone`
 - `npm install`
 - `bash <(curl https://get.parity.io -L) # install parity`

### 2. Run a node

On kovan:

```bash
parity --chain kovan --jsonrpc-apis=all --geth
```
* note the jsonrpc set to all
* note the `--geth` in order to be compatible with `geth`'s unlock 'duration' parameter

On ropsten:
```bash
geth --testnet --fast --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303" --rpc --rpccorsdomain "*" --rpcapi "eth,web3,personal,net"
```

Alternatively, thanks to [ganache-cli](https://github.com/trufflesuite/ganache-cli) we can
easily run an eth rpc node emulator. (NOTE: currently tests will fail using ganache)

```bash
npm test:rpc
```

### 3. Implementing a new feature

Starting by watching the test files ( you will need a node running )

```bash
$ npm run test:watch
```

 - Write the tests for your new features on the `./test/`
 - Add your tests to './test/index.js' file if necessary
 - Create your features on ./src/ folder

### 4. Testing

  - You can test on node.js context by running `npm run test`
  - You can test on a headless browser by running `npm run test:web`
  - You can try it out on your browser ( for instance with MetaMask ) console by running `npm run build:web:run` then going to [http://localhost:2222](http://localhost:2222)

## 5. Building for browers

In order to create a standalone browser build run `npm run build` the
stadalone file will be created at `./dist` folder


## TODO

 - Setup Travis-ci to test node.js, browser and standalone build. [see this page](https://blog.travis-ci.com/2017-09-12-build-stages-order-and-conditions)

## License

MIT
