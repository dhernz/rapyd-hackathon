// Chakra imports
import {
    Flex,
    Icon,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    useDisclosure,
    ModalHeader,
    ModalCloseButton
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardHeader from "components/Card/CardHeader.js";
  import DashboardTableRow from "components/Tables/DashboardTableRow";
  import React, { useState } from "react";
  import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
  import rapyd from 'services/rapyd';
  console.log('rapyd- > ', rapyd);

  const BusinessAccounts = ({ title, amount, captions, data: tableData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState({})
    const textColor = useColorModeValue("gray.700", "white");
    const bgButton = useColorModeValue(
      "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
      "gray.800"
    );

    const createAccount = () => {
        rapyd.createWallet(
            {
                ...rapyd.config,
            },
            {
                ...data
            }
        );
    }
  
    return (
      <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='12px 0px 28px 0px'>
            <Flex direction="row" justifyContent="space-between" width="100%">
                <Flex direction='column'>
                    <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
                    {title}
                    </Text>
                    <Flex align='center'>
                    <Icon
                        as={IoCheckmarkDoneCircleSharp}
                        color='teal.300'
                        w={4}
                        h={4}
                        pe='3px'
                    />
                    <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                        <Text fontWeight='bold' as='span'>
                        {amount} total sales
                        </Text>{" "}
                        this month.
                    </Text>
                    </Flex>
                </Flex>
                    <Button onClick={onOpen} bg={bgButton} color='white' fontSize='xs' variant='no-hover'>
                        ADD NEW BUSINESS ACCOUNT
                    </Button>
            </Flex>
        </CardHeader>
        <Table variant='simple' color={textColor}>
          <Thead>
            <Tr my='.8rem' ps='0px'>
              {captions.map((caption, idx) => {
                return (
                  <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row) => {
              return (
                <DashboardTableRow
                  key={row.name}
                  name={row.name}
                  logo={row.logo}
                  members={row.members}
                  budget={row.budget}
                  progression={row.progression}
                />
              );
            })}
          </Tbody>
        </Table>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Business Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

              Create a 
          </ModalBody>

          <ModalFooter>
              <Button onClick={createAccount}>Create Account</Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Card>
    );
  };
  
  export default BusinessAccounts;
  