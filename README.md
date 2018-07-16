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

###

## Developing

### 1. Setup

 - `git clone`
 - `npm install`
 - `bash <(curl https://get.parity.io -L) # install parity`

### 2. Run a kovan node

```bash
parity --chain kovan --jsonrpc-apis=all --geth
```
* note the jsonrpc set to all
* note the `--geth` in order to be compatible with `geth`'s unlock 'duration' parameter

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
