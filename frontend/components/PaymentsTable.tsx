import { Box, Center, Flex } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const PaymentsTable = () => {
  return (
    <Center>
      <Flex minWidth="max-content" alignItems="center">
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Email</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </Flex>
    </Center>
  );
};

export default PaymentsTable;
