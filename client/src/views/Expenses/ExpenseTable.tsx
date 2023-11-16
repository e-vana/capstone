import { TableContainer, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { ExpenseTableComponent } from "./types";
import ExpenseTableRow from "./ExpenseTableRow";

const ExpenseTable: ExpenseTableComponent = ({ expenses }) => {
  console.log(expenses);
  return (
    <>
      <TableContainer>
        <Table colorScheme="purple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Amount</Th>
              <Th>Organization</Th>
              <Th>User</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses &&
              expenses.map((expense, index) => (
                <ExpenseTableRow expense={expense} key={index} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExpenseTable;
