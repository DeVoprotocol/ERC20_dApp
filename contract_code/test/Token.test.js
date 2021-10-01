const Token = artifacts.require("Token");
const { toBN, BN, toWei } = web3.utils;

contract("Test minting", accounts => {
    let contract
    it("Minted tokens correctly", async () => {
        contract = await Token.deployed()
        const oldPrice = await contract.getCurrentPrice()
        await contract.getToken({from:accounts[0], value:1000000})
        const newPrice = await contract.getCurrentPrice()
        const balance = await contract.balanceOf(accounts[0])
        assert.equal(newPrice.toString(), oldPrice.add(oldPrice.div(new BN('10'))).toString())
        assert.equal(balance, 10)
    })
    it("Transferred tokens correctly", async () => {
        await contract.transfer(accounts[1], 10)
        const balance1 = await contract.balanceOf(accounts[1])
        const balance2 = await contract.balanceOf(accounts[0])
        assert.equal(balance1, 10)
        assert.equal(balance2, 0)
    })
})