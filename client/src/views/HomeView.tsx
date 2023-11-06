import {
  Spinner,
  Stack,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { getOrganizations } from "../api/organizations.api";
import { LoadingComponent } from "../components/Loading";
import ErrorMessage from "../components/Error";
import OrganizationView from "./Organizations";
import EventsView from "./Events";

const HomeView: FunctionComponent = () => {
  const {
    data: orgData,
    isLoading: orgIsLoading,
    isError: orgIsError,
  } = useQuery({
    queryKey: ["getOrganizations"],
    queryFn: getOrganizations,
  });

  const renderState = {
    loading: <LoadingComponent />,
    error: (
      <ErrorMessage
        code={404}
        message="Cant find organizations. Make sure you start the server!"
        flex={1}
      />
    ),
    success: () => (
      <Stack flex={1} height={"100%"}>
        <Helmet title="Home" />
        <Tabs defaultIndex={0} variant={"line"} colorScheme="purple" isLazy>
          <TabList>
            <Tab>Organizations</Tab>
            <Tab>Events</Tab>
          </TabList>
          <TabPanels>
            <TabPanel flex={1}>
              <Helmet title="Organizations" />
              <OrganizationView />
            </TabPanel>
            <TabPanel>
              <Helmet title="Events" />
              <EventsView />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    ),
  };

  if (orgIsLoading) return renderState.loading;
  else if (orgIsError) return renderState.error;
  else if (orgData?.organizations) return renderState.success();
};

export default HomeView;
