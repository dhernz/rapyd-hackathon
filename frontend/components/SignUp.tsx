import { useState } from 'react';
import { Box, Input, Text, Flex, Button } from '@chakra-ui/react';

const SignUp = () => {
    const [email, setEmail] = useState<string>('');

    return (
        <Box m="6">
            <Flex>
                <Text mb="5" fontFamily="DM Sans">Sign up with your email</Text>
                <Input placeholder="youremail@email.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            </Flex>

        </Box>
    )
}

export default SignUp;