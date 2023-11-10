import { Stack, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserExpenseBreakdown } from "../../api/expenses.api";
import { ExpenseTotalComponent } from "./types";
import PieChart from "../../components/Charts/PieChart";

const ExpenseTotal: ExpenseTotalComponent = () => {
  const { data: ExpenseBreakdown } = useQuery({
    queryKey: ["getMyExpenseBreakdown"],
    queryFn: getUserExpenseBreakdown,
  });

  const convertedData = ExpenseBreakdown?.expense_breakdown.map((expense) => ({
    id: expense.organization_name,
    label: expense.organization_name,
    value: parseFloat(expense.total_expenses),
  }));

  if (!ExpenseBreakdown || !convertedData) {
    return <Text>No Expenses Found</Text>;
  } else {
    return (
      <Stack width={"100%"} height={"100%"}>
        <Heading size={"sm"}>Total Expense in Dollars: $</Heading>
        <Stack width={"100%"} height={400} rounded={"lg"} overflowX={"hidden"}>
          <PieChart convertedData={convertedData} valueFormat="$" />
        </Stack>
      </Stack>
    );
  }
};

export default ExpenseTotal;
