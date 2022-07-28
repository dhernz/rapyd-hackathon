import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Image,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
            <Box height="400px" bg={"gray.300"}  p="30px" mt="100px">
                <Flex>
                    <Box width="300px" pt="100px" pl="100px">
                        <Image src="/logo.png" w="180px"/>
                    </Box>
                </Flex>
            </Box>
    )
}

export default Footer;