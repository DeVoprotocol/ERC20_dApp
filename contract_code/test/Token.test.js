const Token = artifacts.require("Token");
const { toBN, BN, toWei } = web3.utils;

contract("Test minting", accounts => {
    let contract
    it("Minted tokens correctly", async () => {
        contract = await Token.deployed()
        const oldPrice = await contract.getCurrentPrice()
        await contract.getToken({from:accounts[5], value:new BN('1000000000000000000')})
        const newPrice = await contract.getCurrentPrice()
        const balance = await contract.balanceOf(accounts[5])
        assert.equal(newPrice.toString(), oldPrice.add(oldPrice.div(new BN('10'))).toString())
        assert.equal(balance.toString(), '1000000000000000000000')
    })
    it("Transferred tokens correctly", async () => {
        await contract.transfer(accounts[1], 1, {from:accounts[5]})
        const balance1 = await contract.balanceOf(accounts[1])
        const balance2 = await contract.balanceOf(accounts[0])
        assert.equal(balance1, 1)
        assert.equal(balance2, 0)
    })
})