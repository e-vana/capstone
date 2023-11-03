import { Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserExpenseBreakdown } from "../../api/expenses.api";
import { ExpenseTotalComponent } from "./types";
import { ResponsivePie } from "@nivo/pie";
import { Theme } from "@nivo/core";

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

  const COLORS = ["#9F7AEA", "#ED64A6", "#38B2AC"];

  const textColor = useColorModeValue("#303030", "#ffffff");
  const bgColor = useColorModeValue("#ffffff", "#303030");
  const theme: Theme = {
    tooltip: {
      container: {
        backgroundColor: bgColor,
      },
    },
    textColor: textColor,
    labels: {
      text: {
        fontSize: 13,
      },
    },
  };

  if (!ExpenseBreakdown || !convertedData) {
    return <Text>No Expenses Found</Text>;
  } else {
    return (
      <Stack width={"100%"} height={"100%"}>
        <Heading size={"sm"}>Total Expense in Dollars: $</Heading>
        <Stack width={"100%"} height={400} rounded={"lg"} overflowX={"hidden"}>
          <ResponsivePie
            data={convertedData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            colors={COLORS}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            enableArcLabels={true}
            arcLabelsTextColor={textColor}
            arcLinkLabelsColor={textColor}
            valueFormat={"$"}
            motionConfig={"gentle"}
            activeOuterRadiusOffset={8}
            theme={theme}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: textColor,
                symbolShape: "circle",
                symbolSize: 18,
              },
            ]}
          />
        </Stack>
      </Stack>
    );
  }
};

export default ExpenseTotal;
