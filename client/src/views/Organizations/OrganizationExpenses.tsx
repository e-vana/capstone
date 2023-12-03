import { useContext, useState } from "react";
import { Stack, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import {
  getExpensesForAnOrganization,
  getOrgExpenseBreakdown,
} from "../../api/expenses.api";
import OrganizationContext from "./OrganizationContext";
import ExpenseFilter from "../Expenses/ExpenseFilter";
import ExpenseTable from "../Expenses/ExpenseTable";
import ExpenseCards from "../Expenses/ExpenseCards";

const OrganizationExpenses = () => {
  const { orgData } = useContext(OrganizationContext);
  const [filter, setFilter] = useState<string>("");
  const { data: ExpenseData } = useQuery(
    ["getOrgExpenses"],
    () => getExpensesForAnOrganization(orgData?.id!) // eslint-disable-line
  );

  const { data: OrgExpBreakdown } = useQuery({
    queryKey: ["getOrgExpenseBreakdown"],
    queryFn: () => getOrgExpenseBreakdown(orgData?.id!), // eslint-disable-line
  });

  const filteredData = ExpenseData?.expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(filter.toLowerCase()) ||
      expense.organization_name.toLowerCase().includes(filter.toLowerCase()) ||
      expense.user_first_name.toLowerCase().includes(filter.toLowerCase())
  );

  const convertedData = OrgExpBreakdown?.expense_breakdown.map((expense) => ({
    id: expense.user_name,
    label: expense.user_name,
    value: parseFloat(expense.total_expenses),
  }));
  console.log(OrgExpBreakdown);
  console.log(convertedData);

  return (
    <>
      <Flex display={{ base: "none", md: "flex" }} gap={3} flex={1}>
        <Stack
          width={"100%"}
          overflowY={"auto"}
          height={"fit-content"}
          maxH={"100%"}
        >
          <Heading size={"lg"} alignSelf={"start"}>
            {orgData?.name} Activity:
          </Heading>
          <ExpenseFilter filter={filter} setFilter={setFilter} />
          <ExpenseTable expenses={filteredData} />
        </Stack>
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        direction={"column"}
        gap={3}
        flex={1}
      >
        <ExpenseCards expenses={filteredData} />
      </Flex>
    </>
  );
};

export default OrganizationExpenses;
