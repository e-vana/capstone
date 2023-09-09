import {
  Box,
  Heading,
  Select,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  IconButton,
  Badge,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEvents } from "../api/events.api";
import { getOrganizations } from "../api/organizations.api";
import ErrorMessage from "../components/Error";
import { AddIcon } from "@chakra-ui/icons";
import MyOrganizationsView from "./MyOrganizationsView";
const HomeView: FunctionComponent = () => {
  const {
    data: orgData,
    isLoading: orgIsLoading,
    isError: orgIsError,
  } = useQuery({
    queryKey: ["getOrganizations"],
    queryFn: getOrganizations,
  });

  const {
    data: eventData,
    isLoading: eventIsLoading,
    isError: eventIsError,
    refetch: refetchEvents,
    isRefetching: eventIsRefetching,
  } = useQuery("getEvents", () => getEvents(selectedOrganization), {
    enabled: false,
  });

  const [selectedOrganization, setSelectedOrganization] = useState<number>(1);
  useEffect(() => {
    refetchEvents();
  }, [selectedOrganization]);
  const renderState = {
    loading: (
      <Stack align={"center"} height={"100%"} flex={1} justify={"center"}>
        <Spinner color={"green"} size={"xl"} />
      </Stack>
    ),
    error: (
      <ErrorMessage
        code={404}
        message="Cant find organizations. Make sure you start the server!"
        flex={1}
      />
    ),
    success: () => (
      <>
        <h1>
          <Tabs>
            <TabList>
              <Tab>Home</Tab>
              <Tab>My Events</Tab>
              <Tab>My Organizations</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <h1>Home</h1>
              </TabPanel>
              <TabPanel>
                <h1>My Events</h1>
              </TabPanel>
              <TabPanel>
                <MyOrganizationsView></MyOrganizationsView>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </h1>
      </>
    ),
  };

  if (orgIsLoading) return renderState.loading;
  else if (orgIsError) return renderState.error;
  else if (orgData?.organizations) return renderState.success();
};

export default HomeView;
