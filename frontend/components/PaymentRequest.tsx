import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Input, Button, Center, OrderedList, ListItem, Select } from '@chakra-ui/react';
import ibanCurrencyCodes from '../constants/ibanCurrencyCodes';
import ibanCountry from '../constants/ibanCountry';
import axios from 'axios';

const paymentServicesApi = 'https://us-central1-rapyd-spacex.cloudfunctions.net/httpPaymentServices';


const PaymentRequest = () => {
    const [amount, setAmount] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [currency, setCurrency] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [payTypes, setPayTypes] = useState<any>();

    useEffect(() => {
        if (country && currency) {
            getPayTypes();
        }
    }, [country, currency])

    const getPayTypes = async () => {

        const payload = {
            "data": {
                "method": "listPaymentMethodsByCountry",
                "currencyCode": currency,
                "countryCode": country
            }
        };
        console.log('payload: ', payload);
        
        const newPayTypes = await axios.post(paymentServicesApi, payload);
        console.log('newPayTypes -> ', newPayTypes);
        setPayTypes(newPayTypes);
    }

    const sendRequest = () => {
        console.log('sendRequest');
    }

    console.log('payTypes -> ', payTypes);
    
    return (
        <Box>
            <Center>
                <Flex minWidth="max-content" alignItems="center" direction="column">
                    <Flex ml={5} width="100%">
                        <Text fontSize="2xl" fontWeight="bold">Welcome 👋🏼!</Text>
                    </Flex>
                    <Box w="100%">
                        {/* Gray box */}
                        <Box
                            borderWidth="0px"
                            borderRadius="lg"
                            overflow="hidden"
                            bg="#EEEDED"
                            color="black"
                            padding={10}
                            m={5}
                        >
                        <Box fontWeight="bold" as="h4" noOfLines={1} mb={3}>
                            How it works?
                        </Box>
                        <Box>
                            <OrderedList spacing={3}>
                                <ListItem>
                                    Enter an amount above $10,000 USD to reserve your ticket.
                                </ListItem>
                                <ListItem>
                                    Provide your personal information
                                </ListItem>
                                <ListItem>
                                    Select your currency and country
                                </ListItem>
                                <ListItem>
                                    We will provide you with a link to send your local bank transfer
                                </ListItem>
                            </OrderedList>
                        </Box>
                        </Box>
                    </Box>

                    <Box w="100%" >
                    {/* Gray box */}
                        <Box
                            borderWidth="0px"
                            borderRadius="lg"
                            overflow="hidden"
                            bg="#EEEDED"
                            color="black"
                            padding={10}
                            m={5}
                        >
                        <Box fontWeight="bold" as="h4" noOfLines={1} mb={3} >
                            Enter amount to reserve:
                        </Box>
                        <Flex justify="center" direction="column">
                            <Input bg="white" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)} placeholder="" />
                        </Flex>
                        <Box color="gray.300" fontSize="sm">minimum of $10,000 USD</Box>
                        </Box>
                    </Box>

                    <Box w="100%" >
                    {/* Gray box */}
                        <Box
                            borderWidth="0px"
                            borderRadius="lg"
                            overflow="hidden"
                            color="black"
                            padding={10}
                            m={5}
                        >
                        <Box fontWeight="bold" as="h4" noOfLines={1} mb={3} >
                            Personal information
                        </Box>
                        <Flex justify="center" direction="column">
                            <Box fontSize="md" mt={4} fontWeight="bold">Name:</Box>
                            <Input bg="white" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="" />

                            <Box fontSize="md" mt={4} fontWeight="bold">Phone:</Box>
                            <Input bg="white" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} placeholder="" />

                            <Box fontSize="md" mt={4} fontWeight="bold">Email:</Box>
                            <Input bg="white" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="" />

                            <Box fontSize="md" mt={4} fontWeight="bold">Country:</Box>
                            <Select placeholder='Select option' onChange={(e: any) => setCountry(e.target.value)}>
                                {ibanCountry.map((ctry: any) => (<option value={ctry.code}>{ctry.country}</option>))}
                            </Select>

                            <Box fontSize="md" mt={4} fontWeight="bold">Currency:</Box>
                            <Select placeholder='Select option' onChange={(e: any) => setCurrency(e.target.value)}>
                                {ibanCurrencyCodes.map((ctry: any) => (<option value={ctry.AlphabeticCode}>{ctry.Currency}</option>))}
                            </Select>

                            <Button
                                mt={4}
                                bgGradient="linear(to-r, #95A3E6, #E9BBC4)"
                                type='submit'
                                width="180px"
                                onClick={sendRequest}
                            >
                                Send Request
                            </Button>
                        </Flex>
                        </Box>
                    </Box>
                </Flex>
            </Center>
        </Box>
    )
}

export default PaymentRequest;
