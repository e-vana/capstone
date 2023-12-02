import {
  Divider,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserMileageBreakdown, getUserMiles } from "../../api/miles.api";
import { useState } from "react";
import ExpenseFilter from "../Expenses/ExpenseFilter";
import MilesTable from "./MilesTable";
import MilesCards from "./MilesCards";
import MilesTotal from "./MilesTotal";
import PieChart from "../../components/Charts/PieChart";

const MilesView = () => {
  const [filter, setFilter] = useState<string>("");

  const { data: MileageData } = useQuery({
    queryKey: ["getMyMileage"],
    queryFn: getUserMiles,
  });

  const filteredMiles = MileageData?.miles.filter((mileage) =>
    mileage.organization_name.toLowerCase().includes(filter.toLowerCase())
  );

  const { data: MileageBreakdown } = useQuery({
    queryKey: ["getUserMileageBreakdown"],
    queryFn: getUserMileageBreakdown, //eslint-disable-line,
  });

  const convertedData = MileageBreakdown?.mileage_breakdown.map((mileage) => ({
    id: mileage.organization_name,
    label: mileage.organization_name,
    value: parseFloat(mileage.total_mileage),
  }));

  return (
    <Stack flex={1} height={"100%"}>
      <Flex
        display={{ base: "none", md: "flex" }}
        gap={3}
        flex={1}
        p={5}
        height={"100%"}
      >
        <Stack
          width={"70%"}
          overflowY={"auto"}
          height={"fit-content"}
          maxH={"100%"}
        >
          <Heading size={"lg"}>My Activity</Heading>
          <ExpenseFilter filter={filter} setFilter={setFilter} />
          <MilesTable miles={filteredMiles} />
        </Stack>
        <Stack>
          <Divider orientation="vertical" />
        </Stack>
        <Stack width={"30%"}>
          <MilesTotal height={400}>
            {convertedData && <PieChart convertedData={convertedData} />}
          </MilesTotal>
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
          <Tab>All Mileage</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ExpenseFilter filter={filter} setFilter={setFilter} />
            <MilesCards miles={filteredMiles} />
          </TabPanel>
          <TabPanel>
            <MilesTotal height={150}>
              {convertedData && <PieChart convertedData={convertedData} />}
            </MilesTotal>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default MilesView;
