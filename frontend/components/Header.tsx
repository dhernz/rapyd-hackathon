import { useState } from 'react';
import { Flex, Box, Image, Button } from '@chakra-ui/react';

const Header = () => {
    return (
        <Flex justify="space-between" p="6">
            <Box>
                <Image src="/logo.png" w="180px"/>
            </Box>
            <Box>
                <Button>
                    <Image src="/hamburger-menu.png" />
                </Button>
            </Box>
        </Flex>
    )
}

export default Header;