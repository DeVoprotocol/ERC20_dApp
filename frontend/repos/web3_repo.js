import Web3 from "web3"
import TokenContract from "../../contract_code/build/contracts/Token.json"
import development from "../../networks/development.json"
import mainnet from "../../networks/mainnet.json"
import rinkeby from "../../networks/rinkeby.json"

const NETWORK_MAP = {
    "1": "mainnet",
    "4": "rinkeby",
    "1337": "development",
  };

class Web3Repo {
    constructor (provider) {
        this.web3 = new Web3(provider);
        const chainId = process.env.CHAIN_ID || 1337
        const network = NETWORK_MAP[chainId]
        if (network==="development"){
            this.contract = new this.web3.eth.Contract(TokenContract.abi, development.address)
        } else if (network==="mainnet"){
            this.contract = new this.web3.eth.Contract(TokenContract.abi, mainnet.address)
        } else if (network==="rinkeby"){
            this.contract = new this.web3.eth.Contract(TokenContract.abi, rinkeby.address)
        } else{
            this.contract = new this.web3.eth.Contract(TokenContract.abi, development.address)
        }
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
        const decimals = await this.contract.methods.decimals().call()
        const price = await this.contract.methods.getCurrentPrice().call()
        console.log(price)
        return price/10**+decimals
    }

    getBalance = async (account) => {
        const decimals = await this.contract.methods.decimals().call()
        const balance = await this.contract.methods.balanceOf(account).call()
        console.log(balance)
        return balance/10**+decimals
    }

    getDecimals = async () => {
        const decimals = await this.contract.methods.decimals().call()
        return decimals
    }

    purchaseToken = async (account, value) => {
        await this.contract.methods.getToken().send({from:account, value:value})
    }
}

export default Web3Repo