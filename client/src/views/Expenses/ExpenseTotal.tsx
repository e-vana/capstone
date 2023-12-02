import { Stack, Heading } from "@chakra-ui/react";
import { ExpenseTotalComponent } from "./types";

const ExpenseTotal: ExpenseTotalComponent = ({ children, ...rest }) => {
  return (
    <Stack width={"100%"} height={"100%"}>
      <Heading size={"sm"}>Total Expense:</Heading>
      <Stack width={"100%"} rounded={"lg"} overflowX={"hidden"} {...rest}>
        {children}
      </Stack>
    </Stack>
  );
};
export default ExpenseTotal;
