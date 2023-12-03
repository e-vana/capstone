import {
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaCar, FaDollarSign } from "react-icons/fa";
import OrganizationExpenses from "./OrganizationExpenses";
import OrganizationMiles from "./OrganizationMiles";

const OrganizationActivity = () => {
  const toolTipAlign = useBreakpointValue(["end", "start"]);

  return (
    <Stack flex={1} height={"100%"} width={"100%"}>
      <Tabs
        variant={"solid-rounded"}
        colorScheme="purple"
        align={toolTipAlign as LineAlignSetting}
        isLazy
      >
        <TabList>
          <Tooltip label="expenses">
            <Tab gap={2}>
              <Icon as={FaDollarSign} />
            </Tab>
          </Tooltip>
          <Tooltip label="mileage">
            <Tab gap={2}>
              <Icon as={FaCar} />
            </Tab>
          </Tooltip>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <OrganizationExpenses />
          </TabPanel>
          <TabPanel padding={0}>
            <OrganizationMiles />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default OrganizationActivity;
