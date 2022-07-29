import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Input, Button, Center, OrderedList, ListItem, Select } from '@chakra-ui/react';
import { useAuth } from '../context/auth';
// import { collection, addDoc, getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

const db: any = getFirestore();

const ordersApi = "https://us-central1-rapyd-spacex.cloudfunctions.net/httpOrderServices";

const Orders = () => {
    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState();
    const { currentUser } = useAuth();

    useEffect(() => {
        currentUser && getOrderData();
    }, [currentUser]);
    useEffect(() => {
        orders && getTransactions();
    }, [orders]);
    const getTransactions = async () => {
        const q = query(collection(db, "payments"), where("userId", "==", currentUser.uid));

        const messageRef = doc(db, "orders", orderId);

        const querySnapshot = await getDocs(q);
        const results = [] as any;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            results.push(doc.data());
        });
        setOrders(results);

    }
    const getOrderData = async () => {

        const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));

        const querySnapshot = await getDocs(q);
        const results = [] as any;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            results.push(doc.data());
        });
        setOrders(results);
        setOrderId(results[0].id)

        // db.collection("orders").where("userId","==", currentUser.uid).get;
        // db.collection("orders").doc("order_742ff0792dbe506b62f0e6568e3774ff").collection("payments").get();
        // await addDoc(collection(db, "landingpage"), {
        //     // name,
        //     email,
        // });
    }
    console.log('currentUser -> ', currentUser);
    console.log('orders -> ', orders && orders[0].id);
    

    return (
        <Box>
            <Text>Orders</Text>
        </Box>
    )
}

export default Orders;