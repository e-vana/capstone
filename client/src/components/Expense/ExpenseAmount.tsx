import { FormControl, FormLabel, Heading, Stack } from "@chakra-ui/react";
import { AmountFormComponent } from "./types";

const ExpenseAmount: AmountFormComponent = ({ children }) => {
  return (
    <Stack gap={5}>
      <Heading size={"md"}>Add Your Expense</Heading>
      <FormControl isRequired>
        <FormLabel>Expense Amount</FormLabel>
        {children}
      </FormControl>
    </Stack>
  );
};

export default ExpenseAmount;
