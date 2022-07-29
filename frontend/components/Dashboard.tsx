import { Box, Center, Flex, Text, Spacer } from "@chakra-ui/react";
import PaymentsTable from "./PaymentsTable";
import axios from "axios";
import { useState, useEffect } from "react";
// import { useAuth } from "../context/auth";

const walletServicesApi =
  "https://us-central1-rapyd-spacex.cloudfunctions.net/httpWalletServices";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Dashboard = () => {
  const [walletInfo, setWalletInfo] = useState<any>();
  useEffect(() => {
    getWalletInfo();
  }, []);
  // const { currentUser, logout } = useAuth();

  const getWalletInfo = async () => {
    const payload = {
      data: {
        method: "retrieve",
        eWallet: "ewallet_173ff120bb0cfb0cf9e313e3d224524a",
      },
    };
    console.log("payload: ", payload);

    const walletInfo = (await axios.post(walletServicesApi, payload)) as any;

    console.log("walletInfo: ", walletInfo);

    setWalletInfo(walletInfo.data);
  };

  return (
    <Center>
      <Flex minWidth="max-content" alignItems="center">
        <Box w="100%" mt={5}>
          {walletInfo &&
            walletInfo.result.data.accounts.map(function (
              account: any,
              i: any
            ) {
              return (
                <Box key={i}>
                  <Box as="h1" noOfLines={1} fontWeight="bold"
                        fontSize="3xl">
                    {account.alias}
                  </Box>
                  
                  <Flex w='100%'>
                    <Box
                      borderWidth="0px"
                      borderRadius="lg"
                    //   overflow="hidden"
                      bg="#EEEDED"
                      color="black"
                      padding={10}
                      m={5}
                      w='33%'
                    >
                      <Box as="h4" noOfLines={1} mb={3}>
                        Total Amount
                      </Box>
                      <Box
                        fontWeight="bold"
                        fontSize="3xl"
                        noOfLines={1}
                        mb={3}
                      >
                        {formatter.format(account.balance + account.received_balance)}
                      </Box>
                    </Box>
                    {/* <Spacer /> */}
                    <Box
                      borderWidth="0px"
                      borderRadius="lg"
                    //   overflow="hidden"
                      bg="#EEEDED"
                      color="black"
                      padding={10}
                      m={5}
                      w='33%'
                    >
                      <Box as="h4" noOfLines={1} mb={3}>
                        Total Received
                      </Box>
                      <Box
                        fontWeight="bold"
                        fontSize="3xl"
                        noOfLines={1}
                        mb={3}
                      >
                        {formatter.format(account.balance)}
                      </Box>
                    </Box>
                    {/* <Spacer /> */}
                    <Box
                      borderWidth="0px"
                      borderRadius="lg"
                    //   overflow="hidden"
                      bg="#EEEDED"
                      color="black"
                      padding={10}
                      m={5}
                      w='33%'
                    >
                      <Box as="h4" noOfLines={1} mb={3}>
                        Total Reserves
                      </Box>
                      <Box
                        fontWeight="bold"
                        fontSize="3xl"
                        noOfLines={1}
                        mb={3}
                      >
                        {formatter.format(account.received_balance)}
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              );
            })}        
        </Box>
        {/* <PaymentsTable /> */}
      </Flex>
    </Center>
  );
};

export default Dashboard;
