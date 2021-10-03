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
        let name
        try{
            name = await this.contract.methods.name().call()
        } catch {
            name = "Token"
            alert('Incorrect contract address. Try redeploying smart contract and reload')
        }
        
        return name
    }

    getSymbol = async () => {
        let symbol
        try {
            symbol = await this.contract.methods.symbol().call()
        } catch {
            symbol = "TK"
            alert('Incorrect contract address. Try redeploying smart contract and reload')
        }
        return symbol
    }

    getPrice = async () => {
        let price
        let decimals = 18
        try {
            decimals = await this.contract.methods.decimals().call()
            price = await this.contract.methods.getCurrentPrice().call()
        } catch {
            price = '1000000000000000000'
            alert('Incorrect contract address. Try redeploying smart contract and reload')
        }
        return price/10**+decimals
    }

    getBalance = async (account) => {
        let balance
        let decimals = 18
        try {
            decimals = await this.contract.methods.decimals().call()
            balance = await this.contract.methods.balanceOf(account).call()
        } catch {
            balance = 0
            alert('Incorrect contract address. Try redeploying smart contract and reload')
        }
        return balance/10**+decimals
    }

    getDecimals = async () => {
        let decimals
        try {
            decimals = await this.contract.methods.decimals().call()
        } catch {
            decimals = 18
            alert('Incorrect contract address. Try redeploying smart contract and reload')
        }
        return decimals
    }

    purchaseToken = async (account, value) => {
        await this.contract.methods.getToken().send({from:account, value:value})
    }
}

export default Web3Repo