import { Box, Flex } from '@chakra-ui/layout'
import Navbar from '../components/navbar'

export default function Home() {
    return (
        <Box>
            {Navbar()}
            <Flex height="100vh" backgroundColor="#ffedf3" alignItems="center" direction="column"></Flex>
        </Box>
    )
}