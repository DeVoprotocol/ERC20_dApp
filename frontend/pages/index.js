import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Box, Flex, Heading  } from '@chakra-ui/layout'
import { Textarea, Text, Button } from "@chakra-ui/react"
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import getter from '../web3Repo/getter'
import Web3 from 'web3'

export default function Home(props) {

  const [eth, setEth] = useState(0)
  const [token, setToken] = useState(0)

  const updateEth = (e) => {
    setEth(e.target.value)
    setToken(e.target.value/props.price)
  }

  const updateToken = (e) => {
    setToken(e.target.value)
    setEth(e.target.value*props.price)
  }

  return (
    <Box height="100vh" backgroundColor="#ffedf3">
      <Flex minW="500px" width="25%" margin="auto" backgroundColor="white" borderRadius="15px" direction="column" padding="15px" boxShadow="xl">
        <Heading as="h4" size="md" margin="auto">{`Purchase ${props.name}`}</Heading>
        <Text margin="auto" mb="35px">{`Current price: ${props.price} eth per ${props.symbol}`}</Text>
        <Flex margin="auto" justifyContent="center" direction="row" padding="10px" width="90%">
          <Flex direction="column" pr="20px" alignItems="flex-end" width="35%">
            <Heading as="h4" size="md">ETH</Heading>
            <Flex direction="row">
              <Text fontSize="xs">{`Balance: ${props.ethBalance}`}</Text>
              &nbsp;
              <Text fontSize="xs" color="blue" _hover={{cursor:"pointer"}} onClick={() => {updateEth({target:{value:props.ethBalance}})}}>(Max)</Text>
            </Flex>
          </Flex>
          <NumberInput defaultValue={0} value={eth} min={0}>
            <NumberInputField onChange={updateEth}/>
          </NumberInput>
        </Flex>
        <Flex margin="auto" justifyContent="center" direction="row" padding="10px" width="90%">
          <Flex alignItems="flex-end" width="35%" pr="20px" direction="column">
            <Heading as="h4" size="md">{props.symbol}</Heading>
            <Text fontSize="xs">{`Balance: ${props.tokenBalance}`}</Text>
          </Flex>
          
          <NumberInput defaultValue={0} value={token} min={0}>
            <NumberInputField onChange={updateToken}/>
          </NumberInput>
        </Flex>
        <Flex width="full" padding="15px">
          <Button w="full" colorScheme="twitter">Purchase Tokens</Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export async function getStaticProps(context) {
  const name = await getter.getName()
  const symbol = await getter.getSymbol()
  const price = await getter.getPrice()
  return {
    props: {name, symbol, price: Web3.utils.fromWei(price), ethBalance:10, tokenBalance:5}, // will be passed to the page component as props
    revalidate: 10
  }
}