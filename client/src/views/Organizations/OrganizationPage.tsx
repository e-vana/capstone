import {
  Flex,
  Stack,
  Tabs,
  TabList,
  TabPanel,
  Tab,
  TabPanels,
  SimpleGrid,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getOrganization } from "../../api/organizations.api";
import { getTeams } from "../../api/teams.api";
import { getEventsInAnOrg } from "../../api/events.api";
import OrganizationContainer from "./OrganizationContainer";
import OrganizationHeader from "./OrganizationHeader";
import OrganizationTeams from "./OrganizationTeams";
import OrganizationMembers from "./OrganizationMembers";
import OrganizationContext from "./OrganizationContext";
import OrganizationEvents from "./OrganizationEvents";
import {
  setOrg,
  setTeam,
  setTeams,
} from "../../features/Organizations/organizationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import OrganizationActivity from "./OrganizationActivity";
import OrganizationExpenseTotal from "./OrganizationExpenseTotal";
import OrganizationMilesTotal from "./OrganizationMilesTotal";

export const FAKE_MEMBERS = [
  {
    name: "Tony Pizza",
  },
  {
    name: "John Davis",
  },
  {
    name: "Nicol Bolas",
  },
  {
    name: "Alice Watkins",
  },
  {
    name: "Jessie Santarino",
  },
];

const OrganizationPage = () => {
  const { organizationId } = useParams();
  const dispatch = useAppDispatch();

  const { data: orgData, isLoading: orgLoading } = useQuery(
    "getOrganization",
    () => getOrganization(+organizationId!)
  );

  const { data: teamsData, isLoading: teamsLoading } = useQuery(
    "getTeams",
    () => getTeams(+organizationId!)
  );

  const { data: eventsData, isLoading: eventsLoading } = useQuery(
    "getEvents",
    () => getEventsInAnOrg(+organizationId!)
  );

  // When the teams data is loaded, set the active team to the organization-wide team
  useEffect(() => {
    if (!organizationId) {
      throw new Error("No Organization ID was passed to OrganizationPage");
      // TODO: Redirect back to all Orgs. view
    }
    console.log("Organization Page: Render");
    // Ensure the currently selected org. is set in the redux store
    dispatch(setOrg(+organizationId));
    // Add organization teams to redux store
    dispatch(setTeams(teamsData?.teams || []));
    // When a user is on this screen, adding events will be put into the global team
    // so set the active team to the organization-wide team
    dispatch(
      setTeam(
        // The "global" team is initially named "Organization-wide Team"
        teamsData?.teams?.find((team) =>
          team.name.includes("Organization-wide Team")
        )?.id ||
          // If the name's been changed, we can search for the lowest ID, since it'll have been
          // created first. Ideally, the org-wide team would have a flag that we could use to identify it,
          teamsData?.teams?.reduce((acc, team) => {
            if (team.id < acc.id) {
              return team;
            }
            return acc;
          })?.id ||
          -1
      )
    );
  }, [orgData, teamsData, organizationId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <OrganizationContext.Provider
        value={{
          orgData,
          teamsData,
          eventsData,
          members: FAKE_MEMBERS,
          orgLoading,
          teamsLoading,
          eventsLoading,
          membersLoading: false,
        }}
      >
        <OrganizationContainer>
          <Stack width={{ base: "100%", md: "33%" }}></Stack>
          <Tabs isLazy colorScheme="purple" variant={"enclosed"}>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Teams</Tab>
              <Tab>Events</Tab>
              <Tab>Activity</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex
                  flexDir={{ base: "column", md: "row" }}
                  width={"100%"}
                  justify={"start"}
                  gap={5}
                >
                  <Stack width={{ base: "100%", md: "40%" }}>
                    <OrganizationHeader>{orgData?.name}</OrganizationHeader>
                    <OrganizationMembers />
                  </Stack>
                  <SimpleGrid
                    width={{ base: "100%", md: "60%" }}
                    columns={2}
                    alignItems={"start"}
                    gap={5}
                  >
                    <OrganizationExpenseTotal />
                    <OrganizationMilesTotal />
                  </SimpleGrid>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Stack width={{ base: "100%", md: "100%" }}>
                  <OrganizationTeams />
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack width={{ base: "100%", md: "100%" }}>
                  <OrganizationEvents />
                </Stack>
              </TabPanel>
              <TabPanel>
                <OrganizationActivity />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </OrganizationContainer>
      </OrganizationContext.Provider>
    </>
  );
};

export default OrganizationPage;
