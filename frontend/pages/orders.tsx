import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Input, Button, Center, OrderedList, ListItem, Select } from '@chakra-ui/react';
import { useAuth } from '../context/auth';
import { collection, query, where, getDocs, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";

const db: any = getFirestore();

const ordersApi = "https://us-central1-rapyd-spacex.cloudfunctions.net/httpOrderServices";

const Orders = () => {
    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState();
    const [transactions, setTransactions] = useState<any>();
    const [amountDue, setAmountDue] = useState<number>(150000);
    const { currentUser } = useAuth();

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
    
    return (
        <Box mt="12">
            <Center>
                <Flex minWidth="max-content" alignItems="center" direction="column">
                    <Flex ml={5} width="100%">
                        <Text fontSize="2xl" fontWeight="bold">Orders</Text>
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
                                Transactions
                            </Box>
                            {transactions.map((trans: any) => {
                                return (
                                    <Box>{trans.original_amount}</Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Flex>
            </Center>
        </Box>
    )
}

export default Orders;