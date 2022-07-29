import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
  
// ['Amount', 'Paid', 'Account Number', 'Next Action', 'Expiration'

  function TablesTableRow(props: any) {
    const { original_amount, paid, payment_method_data, next_action, expiration } = props.data;
    const { account_number } = payment_method_data;
    console.log('data -> ', props.data);
    
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
    const formattedExpiration = timeConverter(Number(expiration));
    function timeConverter(UNIX_timestamp: number){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ';
        return time;
      }
    
    return (
      <Tr>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {original_amount}
              </Text>
            </Flex>
          </Flex>
        </Td>
  
        <Td>
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {account_number}
            </Text>
          </Flex>
        </Td>
        <Td>
          <Badge
            bg={paid === true ? "green.400" : bgStatus}
            color={paid === false ? "white" : colorStatus}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {paid ? 'Paid' : 'Pending'}
          </Badge>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {formattedExpiration}
          </Text>
        </Td>
        <Td>
            <Text
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              {next_action}
            </Text>
        </Td>
      </Tr>
    );
  }
  
  export default TablesTableRow;
  