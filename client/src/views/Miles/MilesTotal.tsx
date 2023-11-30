import { Heading, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserMileageBreakdown } from "../../api/miles.api";
import PieChart from "../../components/Charts/PieChart";

const MilesTotal = () => {
  const { data: MileageBreakdown } = useQuery({
    queryKey: ["getMyMileageBreakdown"],
    queryFn: getUserMileageBreakdown,
  });

  const convertedData = MileageBreakdown?.mileage_breakdown.map((mileage) => ({
    id: mileage.organization_name,
    label: mileage.organization_name,
    value: parseFloat(mileage.total_mileage),
  }));

  console.log(convertedData);

  if (!MileageBreakdown || !convertedData) {
    return <Text>No Mileage Found</Text>;
  }

  return (
    <Stack width={"100%"} height={"100%"}>
      <Heading size={"sm"}>Total Mileage:</Heading>
      <Stack width={"100%"} height={400} rounded={"lg"} overflowX={"hidden"}>
        <PieChart convertedData={convertedData} />
      </Stack>
    </Stack>
  );
};

export default MilesTotal;
