const Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(Token, "Generic_Token", "GT", 100000);
};
