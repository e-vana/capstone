import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
} from "@chakra-ui/react";
import { ExpenseTableComponent } from "./types";
import ExpenseTableRow from "./ExpenseTableRow";

const ExpenseTable: ExpenseTableComponent = ({ expenses }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Amount</Th>
              <Th>Organization</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses ? (
              expenses.map((expense, index) => (
                <ExpenseTableRow expense={expense} key={index} />
              ))
            ) : (
              <Text>No Expenses Yet!</Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExpenseTable;
