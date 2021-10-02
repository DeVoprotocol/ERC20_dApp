import Web3 from "web3"
import TokenContract from "../../contract_code/build/contracts/Token.json"
import {address} from "../../networks/development.json"

class Getter {
    constructor (provider) {
        this.web3 = new Web3(provider);
        this.contract = new this.web3.eth.Contract(TokenContract.abi, address)
    }

    getName = async () => {
        const name = await this.contract.methods.name().call()
        return name
    }

    getSymbol = async () => {
        const symbol = await this.contract.methods.symbol().call()
        return symbol
    }

    getPrice = async () => {
        const price = await this.contract.methods.getCurrentPrice().call()
        return Web3.utils.fromWei(price)
    }

    getBalance = async (account) => {
        const balance = await this.contract.methods.balanceOf(account).call()
        return balance
    }

    purchaseToken = async (account, value) => {
        await this.contract.methods.getToken().send({from:account, value:value})
    }
}

export default Getter