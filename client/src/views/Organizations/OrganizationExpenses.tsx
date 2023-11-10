import { useContext, useState } from "react";
import { Stack, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getExpensesForAnOrganization } from "../../api/expenses.api";
import OrganizationContext from "./OrganizationContext";
import ExpenseFilter from "../Expenses/ExpenseFilter";
import ExpenseTable from "../Expenses/ExpenseTable";

const OrganizationExpenses = () => {
  const { orgData } = useContext(OrganizationContext);
  const [filter, setFilter] = useState<string>("");
  const { data: ExpenseData } = useQuery(
    ["getOrgExpenses"],
    () => getExpensesForAnOrganization(orgData?.id!) // eslint-disable-line
  );

  const filteredData = ExpenseData?.expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(filter.toLowerCase()) ||
      expense.organization_name.toLowerCase().includes(filter.toLowerCase()) ||
      expense.user_first_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
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
  );
};

export default OrganizationExpenses;
