import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Input, Button, Center, OrderedList, ListItem, Select } from '@chakra-ui/react';
import { useAuth } from '../context/auth';
import { collection, query, where, getDocs, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";
import TransTable from '../components/TransTable';
const db: any = getFirestore();

const ordersApi = "https://us-central1-rapyd-spacex.cloudfunctions.net/httpOrderServices";

const Orders = () => {
    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState();
    const [transactions, setTransactions] = useState<any>();
    const [amountDue, setAmountDue] = useState<number>(150000);
    const { currentUser, setPaymentData, paymentData } = useAuth();

    useEffect(() => {
        currentUser && getOrderData();
    }, [currentUser]);
    useEffect(() => {
        orders && getTransactions();
    }, [orders]);
    const getTransactions = async () => {
        if (!orderId) {
            return;
        }

        let collectionRef = collection(db, "orders", orderId, "payments");
        const transDocs = [] as any;
          onSnapshot(collectionRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log("Id: ", doc.id, "Data: ", doc.data());
              transDocs.push(doc.data());
            });
            setTransactions(transDocs);
          });
    }
    const getOrderData = async () => {

        const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));

        const querySnapshot = await getDocs(q);
        const results = [] as any;
        const orderIds = [] as any;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            results.push(doc.data());
            orderIds.push(doc.id);
        });
        setOrders(results);
        setOrderId(orderIds[0])
    }

    console.log('currentUser -> ', currentUser);
    console.log('orders -> ', orders, orderId);
    console.log('transactions -> ', transactions);
    console.log('paymentData -> ', paymentData);
    
    
    return (
        <Box mt="12">
            <Center>
                <Flex minWidth="max-content" alignItems="center" direction="column">
                    <Flex ml={5} width="100%">
                        <Text fontFamily="DM Sans" fontSize="2xl" fontWeight="bold">Orders</Text>
                    </Flex>
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
                                Amount due:
                            </Box>
                            <Text fontSize="4xl" fontWeight="bold">${amountDue}</Text>
                            <Text m="4" fontSize="md" color="gray.600">In order to secure your ticket complete payment must be done within 30 days.</Text>
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
                                Make a wire transfe to:
                            </Box>
                            <Text my="2" fontSize="md" color="gray.600">account number:</Text>
                            <Text fontSize="4xl" fontWeight="bold">{transactions && transactions[0].payment_method_data.account_number}</Text>
                            <Text my="2" fontSize="md" color="gray.600">routing number:</Text>
                            <Text fontSize="4xl" fontWeight="bold">{transactions && transactions[0].payment_method_data.routing_number}</Text>
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
                            {transactions && <TransTable title="Transactions" captions={['Amount', 'Account Number', 'Paid', 'Expiration', 'Next Action']} data={transactions} />}
                        </Box>
                    </Box>
                    <Button
                        mt={4}
                        bgGradient="gray.300"
                        width="180px"
                        onClick={() => console.log('refund')}
                    >
                        Initiate Refund
                    </Button>
                </Flex>
            </Center>
        </Box>
    )
}

export default Orders;