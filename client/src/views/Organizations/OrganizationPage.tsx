import { Flex, Stack } from "@chakra-ui/react";
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
import { setOrg, setTeam, setTeams, setEvents } from "../../features/Organizations/organizationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";

const FAKE_MEMBERS = [
  {
    name: "Tony Pizza",
  },
  {
    name: "Megatron",
  },
  {
    name: "Walter White",
  },
  {
    name: "Johnny Bravo",
  },
  {
    name: "Shrek",
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

  // Determine the currently active team, if one hasn't been chosen, use the organization-wide team
  const { selectedTeam } = useAppSelector((state) => state.organizations);

  // When the teams data is loaded, set the active team to the organization-wide team
  useEffect(() => {
    // Add organization teams to redux store
    dispatch(setTeams(teamsData?.teams || []));
    // Set the active organization in the redux store
    dispatch(setOrg(+organizationId!));
    // By default, set the active team to the organization-wide team
    if (selectedTeam === 0 && teamsData && teamsData.teams.length > 0) {
      console.log("Teams in this org: " + JSON.stringify(teamsData.teams));
      // Searching for the name here because I'm not sure if the first element in the array is always the org-wide team
      // TODO: This doesn't seem to be the most ideal way - what if the org-wide team name changes or something?
      // Ideally, the org-wide team would have a flag or something that we could use to identify it, but it should
      // also be the first element in the array (with the lowest ID)
      dispatch(setTeam(teamsData.teams.find((team) => team.name.includes("Organization-wide Team"))!.id) || teamsData.teams[0].id);
    }
  }, [orgData, teamsData]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <Flex
            flexDir={{ base: "column", md: "row" }}
            width={"100%"}
            justify={"start"}
            gap={5}
          >
            <Stack width={{ base: "100%", md: "33%" }}>
              <OrganizationHeader>{orgData?.name}</OrganizationHeader>
              <OrganizationTeams />
            </Stack>
            <Stack width={{ base: "100%", md: "33%" }}>
              <OrganizationMembers />
            </Stack>
            <Stack width={{ base: "100%", md: "33%" }}>
              <OrganizationEvents />
            </Stack>
          </Flex>
        </OrganizationContainer>
      </OrganizationContext.Provider>
    </>
  );
};

export default OrganizationPage;
