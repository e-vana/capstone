import { Stack, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserExpenseBreakdown } from "../../api/expenses.api";
import { ExpenseTotalComponent } from "./types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpenseTotal: ExpenseTotalComponent = () => {
  const { data: ExpenseBreakdown } = useQuery({
    queryKey: ["getMyExpenseBreakdown"],
    queryFn: getUserExpenseBreakdown,
  });

  const convertedData = ExpenseBreakdown?.expense_breakdown.map((expense) => ({
    ...expense,
    total_expenses: parseFloat(expense.total_expenses),
  }));

  const COLORS = ["#9F7AEA", "#ED64A6", "#38B2AC"];

  const variant = useBreakpointValue({
    base: 350,
    md: 400,
    "2xl": 550,
  });

  if (!ExpenseBreakdown || !convertedData) {
    return <Text>No Expenses Found</Text>;
  } else {
    return (
      <Stack width={"100%"} height={"100%"}>
        <Heading size={"sm"}>Total Expense in Dollars: $</Heading>
        <Stack width={"50%"}>
          <ResponsiveContainer width={variant} height={variant}>
            <PieChart>
              <Pie
                data={convertedData}
                dataKey={"total_expenses"}
                nameKey={"organization_name"}
                cx={"50%"}
                cy={"50%"}
                outerRadius={80}
                fill="#303030"
                label
              >
                {convertedData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Stack>
      </Stack>
    );
  }
};

export default ExpenseTotal;
