import { useQuery } from "react-query";
import { getOrgExpenseBreakdown } from "../../api/expenses.api";
import ExpenseTotal from "../Expenses/ExpenseTotal";
import { Card, CardBody, Skeleton, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import SmallPie from "../../components/Charts/SmallPie";
import { TitleCardContainer } from "../../components/Cards";

const OrganizationExpenseTotal = () => {
  const { organizationId } = useParams();
  const {
    data: OrgExpBreakdown,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["getOrgExpenseBreakdown"],
    queryFn: () => getOrgExpenseBreakdown(+organizationId!), // eslint-disable-line
  });

  const convertedData = OrgExpBreakdown?.expense_breakdown.map((expense) => ({
    id: expense.user_name,
    label: expense.user_name,
    value: parseFloat(expense.total_expenses),
  }));

  console.log(OrgExpBreakdown);

  return (
    <Skeleton isLoaded={!isLoading} minH={"100px"} rounded={"lg"}>
      {isSuccess && convertedData ? (
        <TitleCardContainer>
          <CardBody>
            <ExpenseTotal height={150}>
              {convertedData && (
                <SmallPie convertedData={convertedData} valueFormat="$" />
              )}
            </ExpenseTotal>
          </CardBody>
        </TitleCardContainer>
      ) : (
        <Text>No Data Available</Text>
      )}
    </Skeleton>
  );
};

export default OrganizationExpenseTotal;
