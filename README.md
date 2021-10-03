# ERC20_dApp
Distributed app to purchase an ERC20 token whose value increases on every mint

Stack:
- Truffle
- Ganache
- Web3.js
- NextJs
- ReactJs
- ChakraUI

# Running locally
1) Deploy a blockchain using ganache on port 8545 with network id 5777 and chain id 1337
2) Install metamask and connect to localhost 8545 network
3) Run the following
```shell
yarn install
yarn migrate
yarn build
yarn start
```
4) Go to http://localhost:3000
5) In order to add the token to your wallet, use the contract address from networks/development.json

<code>yarn test</code> can be used to test the smart contract code
