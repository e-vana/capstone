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
        </h1>
      </>
    ),
  };

  if (orgIsLoading) return renderState.loading;
  else if (orgIsError) return renderState.error;
  else if (orgData?.organizations) return renderState.success();
};

export default HomeView;
