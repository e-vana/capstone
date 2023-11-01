import { Tr, Td, Button, useDisclosure } from "@chakra-ui/react";
import { ExpenseTableRowComponent } from "./types";
import ExpenseModal from "./ExpenseModal";

const ExpenseTableRow: ExpenseTableRowComponent = ({ expense }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr>
        <Td>{expense.expense_name}</Td>
        <Td>${expense.amount}</Td>
        <Td>{expense.organization_name}</Td>
        <Td>
          <Button onClick={onOpen}>See More</Button>
        </Td>
      </Tr>
      <ExpenseModal isOpen={isOpen} onClose={onClose} expense={expense} />
    </>
  );
};

export default ExpenseTableRow;
