import { useEffect, useState } from 'react'
import { Box, Flex, Heading  } from '@chakra-ui/layout'
import { Text, Button } from "@chakra-ui/react"
import {
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react"
import Web3Repo from '../repos/web3_repo'
import Web3 from 'web3'
import Navbar from '../components/navbar'

export default function Home() {

  const [web3Repo, setWeb3Repo] = useState()
  const [name, setName] = useState("DeVo")
  const [symbol, setSymbol] = useState("DEVO")
  const [price, setPrice] = useState(0)
  const [decimals, setDecimals] = useState(18)
  const [eth, setEth] = useState(0)
  const [ethBalance, setEthBalance] = useState('0')
  const [token, setToken] = useState(0)
  const [tokenBalance, setTokenBalance] = useState('0')
  const [errorMessage, setErrorMessage] = useState('')
  const [inputError, setInputError] = useState('')
  const [web3, setWeb3] = useState(new Web3(Web3.givenProvider))

  
  const getDetails = async (web3Repo) => {
    const name = await web3Repo.getName()
    const price = await web3Repo.getPrice()
    const symbol = await web3Repo.getSymbol()
    const decimals = await web3Repo.getDecimals()
    setName(name)
    setPrice(price)
    setSymbol(symbol)
    setDecimals(decimals)
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const chainId = parseInt(Web3.givenProvider.chainId, 16)
      const accounts = await web3.eth.getAccounts()
      let tempRepo
      let error = ''
      if (chainId!==(process.env.CHAIN_ID || 1981)) {
        setTokenBalance(0)
        error = `Connect to chain ${process.env.CHAIN_ID || 1981}`
      } else{
        if (!web3Repo){
          tempRepo = new Web3Repo(Web3.givenProvider)
          setWeb3Repo(tempRepo)
          getDetails(tempRepo)
        }else {
          tempRepo = web3Repo
          getDetails(tempRepo)
        }
      }
      if (accounts.length===0){
        error = 'Wallet not connected'
        setEthBalance(0)
        setTokenBalance(0)
      } else{
        const ethBalance = await web3.eth.getBalance(accounts[0])
        setEthBalance(Web3.utils.fromWei(String(ethBalance)))
      }
      if (!error) {
        const tokenBalance = await tempRepo.getBalance(accounts[0])
        setTokenBalance(tokenBalance)
      }
      setErrorMessage(error)
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (+eth>+ethBalance){
      setInputError('Insufficient balance')
    } else if (+eth<=0||isNaN(eth)) {
      setInputError('Inappropriate eth amount')
    } else {
      setInputError('')
    }
  }, [eth, ethBalance])

  const purchase = async () => {
    const accounts = await web3.eth.getAccounts()
    web3Repo.purchaseToken(accounts[0], Web3.utils.toWei(String(eth), 'ether'))
  }

  const updateEth = (e) => {
    setEth(e.target.value)
    setToken(e.target.value/price)
  }

  const updateToken = (e) => {
    setToken(e.target.value)
    setEth(e.target.value*price)
  }

  return (
    <Box>
    {Navbar()}
    <Flex height="100vh" backgroundColor="#ffedf3" alignItems="center" direction="column">
      <Flex minW="500px" my="200px" width="25%" backgroundColor="white" borderRadius="15px" direction="column" padding="20px" boxShadow="xl">
        <Heading as="h4" size="md" margin="auto" mt="10px">{`Purchase ${name}`}</Heading>
        <Text margin="auto" mb="35px">{`Current price: ${price} eth per ${symbol}`}</Text>
        <Flex margin="auto" justifyContent="center" direction="row" py="10px" width="90%">
          <Flex direction="column" pr="20px" alignItems="flex-end" width="35%">
            <Heading as="h4" size="md">ETH</Heading>
            <Flex direction="row">
              <Text textAlign="right" fontSize="xs">{`Balance: ${parseFloat(ethBalance).toFixed(3)}`}</Text>
              &nbsp;
              <Text fontSize="xs" color="blue" _hover={{cursor:"pointer"}} onClick={() => {updateEth({target:{value:ethBalance}})}}>(Max)</Text>
            </Flex>
          </Flex>
          <NumberInput defaultValue={0} value={eth} min={0} max={ethBalance}>
            <NumberInputField onChange={updateEth}/>
          </NumberInput>
        </Flex>
        <Flex margin="auto" justifyContent="center" direction="row" py="10px" width="90%">
          <Flex alignItems="flex-end" width="35%" pr="20px" direction="column">
            <Heading as="h4" size="md">{symbol}</Heading>
            <Text textAlign="right" fontSize="xs">{`Balance: ${parseFloat(tokenBalance).toFixed(3)}`}</Text>
          </Flex>
          
          <NumberInput defaultValue={0} value={token} min={0} max={ethBalance/price}>
            <NumberInputField onChange={updateToken}/>
          </NumberInput>
        </Flex>
        <Flex width="full" padding="15px" direction="column" alignItems="center">
          <Text color="red" padding="4px" fontSize="xs">{errorMessage||inputError? errorMessage||inputError: null}</Text>
          <Button isDisabled={errorMessage||inputError} w="full" colorScheme="twitter" onClick={purchase}>Purchase Tokens</Button>
        </Flex>
      </Flex>
    </Flex>
    </Box>
  )
}

// export async function getStaticProps(context) {
//   const name = await web3Repo.getName()
//   const symbol = await web3Repo.getSymbol()
//   const price = await web3Repo.getPrice()
//   return {
//     props: {name, symbol, price: Web3.utils.fromWei(price), ethBalance:10, tokenBalance:5}, // will be passed to the page component as props
//     revalidate: 10
//   }
// }
