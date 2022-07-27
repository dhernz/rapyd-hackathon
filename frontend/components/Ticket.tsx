import { Box, Center, Flex } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { Formik } from 'formik';
import EmailSignupForm from "./EmailSignupForm";

const Ticket = () => {
    function validateName(value: string) {
        let error
        if (!value) {
          error = 'Name is required'
        } else if (value.toLowerCase() !== 'naruto') {
          error = "Jeez! You're not a fan 😱"
        }
        return error
      }

  return (
    <Center>
    <Flex minWidth="max-content" alignItems="center">
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
          <Box as="h4" noOfLines={1} mb={3}>
            Reserve your ticket with only:
          </Box>
          <Box fontWeight="bold" fontSize="5xl" noOfLines={1} mb={3}>
            $10,000 🚀
          </Box>
          <Box as="i" noOfLines={1} mb={5}>
            Total ticket price: $150,000 USD
          </Box>
          <Box>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Pay from any country for free
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                30 days to pay full amount
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Reservation 100% refundable
              </ListItem>
            </List>
          </Box>
        </Box>
        <Flex justify="center">
          <Box m={5}>Sign up with your email</Box>
        </Flex>
        <Box m={5}>
            <EmailSignupForm />
        </Box>
      </Box>
    </Flex>
    </Center>
  );
};

export default Ticket;
