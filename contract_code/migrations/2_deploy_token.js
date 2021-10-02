const Token = artifacts.require("Token");
const fs = require("fs")
var path = require('path');

module.exports = async function (deployer, network) {
  deployer.deploy(Token, "Generic_Token", "GT", 1000000000);
  const token = await Token.deployed()

  fs.writeFileSync(
    path.join(__dirname, `../../networks/${network}.json`),
    JSON.stringify({address: token.address}, null, 2)
  );
};
