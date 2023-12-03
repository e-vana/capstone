import {
  Divider,
  Heading,
  Stack,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import {
  getUserExpenses,
  getUserExpenseBreakdown,
} from "../../api/expenses.api";
import ExpenseTable from "./ExpenseTable";
import ExpenseCards from "./ExpenseCards";
import { useState } from "react";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseTotal from "./ExpenseTotal";
import { Helmet } from "react-helmet";
import PieChart from "../../components/Charts/PieChart";

const ExpenseView = () => {
  const [filter, setFilter] = useState<string>("");

  const { data: ExpenseData } = useQuery({
    queryKey: ["getMyExpenses"],
    queryFn: getUserExpenses,
  });

  const filteredExpenses = ExpenseData?.expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(filter.toLowerCase()) ||
      expense.organization_name.toLowerCase().includes(filter.toLowerCase())
  );
  const { data: ExpenseBreakdown } = useQuery({
    queryKey: ["getMyExpenseBreakdown"],
    queryFn: getUserExpenseBreakdown,
  });

  const convertedData = ExpenseBreakdown?.expense_breakdown.map((expense) => ({
    id: expense.organization_name,
    label: expense.organization_name,
    value: parseFloat(expense.total_expenses),
  }));

  return (
    <Stack flex={1} height={"100%"}>
      {/* DESKTOP VIEW */}
      <Flex display={{ base: "none", md: "flex" }} gap={3} flex={1} p={5}>
        <Stack
          width={"70%"}
          overflowY={"auto"}
          height={"fit-content"}
          maxH={"100%"}
        >
          <Heading size={"lg"}>My Activity</Heading>
          <ExpenseFilter filter={filter} setFilter={setFilter} />
          <ExpenseTable expenses={filteredExpenses} />
        </Stack>
        <Stack>
          <Divider orientation="vertical" />
        </Stack>
        <Stack width={"30%"}>
          <ExpenseTotal height={400}>
            {convertedData && <PieChart convertedData={convertedData} />}
          </ExpenseTotal>
        </Stack>
      </Flex>

      {/* MOBILE VIEW */}
      <Tabs
        display={{ base: "block", md: "none" }}
        isLazy
        colorScheme="purple"
        variant={"soft-rounded"}
      >
        <TabList>
          <Tab>Activity</Tab>
          <Tab>All Expenses</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Helmet title="Activity" />
            <ExpenseFilter filter={filter} setFilter={setFilter} />
            <ExpenseCards expenses={filteredExpenses} />
          </TabPanel>
          <TabPanel>
            <Helmet title="My Expenses" />
            <ExpenseTotal />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default ExpenseView;
