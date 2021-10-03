const Token = artifacts.require("Token");
const fs = require("fs")
var path = require('path');
const Web3 = require('web3')

module.exports = async function (deployer, network) {
  await deployer.deploy(Token, "Generic_Token", "GT", Web3.utils.toBN('1000000000000000'));
  const token = await Token.deployed()

  fs.writeFileSync(
    path.join(__dirname, `../../networks/${network}.json`),
    JSON.stringify({address: token.address}, null, 2)
  );
};
