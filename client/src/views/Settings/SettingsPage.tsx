import {
  Stack,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import UserSettings from "./UserSettings";
import GeneralSettings from "./GeneralSettings";
import ExpenseView from "../Expenses/ExpenseView";

const SettingsPage = () => {
  return (
    <Stack flex={1}>
      <Tabs colorScheme="purple">
        <TabList>
          <Tab>User</Tab>
          <Tab>General</Tab>
          <Tab>Expenses</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserSettings />
          </TabPanel>
          <TabPanel>
            <GeneralSettings />
          </TabPanel>
          <TabPanel>
            <ExpenseView />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default SettingsPage;
