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

const efx = await FX( web3 )
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

### Running a node

#### 2. Simulating a node

Thanks to [ganache-cli](https://github.com/trufflesuite/ganache-cli) we can
easily run an eth rpc node emulator

```bash
npm test:rpc
```

#### Running a real test node

Alternatively you might want to run a real node on the ropsten testnet:

```bash
geth --testnet --fast --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303" --rpc --rpccorsdomain "*" --rpcapi "eth,web3,personal"
```

* note the --rpcapi "eth,web3,personal" at the end!

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
  - You can try it out on your browser console by running `npm run build:web:run` then going to [http://localhost:2222](http://localhost:2222)

## 5. Building for browers

In order to create a standalone browser build run `npm run build` the
stadalone file will be created at `./dist` folder


## TODO

 - Setup Travis-ci to test node.js, browser and standalone build. [see this page](https://blog.travis-ci.com/2017-09-12-build-stages-order-and-conditions)

## License

MIT
