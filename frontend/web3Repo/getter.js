import Web3 from "web3"
import TokenContract from "../../contract_code/build/contracts/Token.json"
import web3Config from "../../web3-config.json"

class Getter {
    constructor () {
        this.web3 = new Web3(new Web3.providers.HttpProvider(web3Config.urlProvider));
        this.contract = new this.web3.eth.Contract(TokenContract.abi, web3Config.tokenContractAddress)
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
        return price
    }
}

export default new Getter()