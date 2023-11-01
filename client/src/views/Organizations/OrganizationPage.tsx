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
import {
  setOrg,
  setTeam,
  setTeams,
} from "../../features/Organizations/organizationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";

export const FAKE_MEMBERS = [
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
  
  // When the teams data is loaded, set the active team to the organization-wide team
  useEffect(() => {
    // Add organization teams to redux store
    dispatch(setTeams(teamsData?.teams || []));
    // Set the active organization in the redux store
    dispatch(setOrg(+organizationId!));
    // When a user is on this screen, adding events will be put into the global team
    // so set the active team to the organization-wide team
    dispatch(
      setTeam(
        // The "global" team is initially named "Organization-wide Team"
        teamsData?.teams?.find((team) =>
          team.name.includes("Organization-wide Team")
        )?.id
        ||
        // If the name's been changed, we can search for the lowest ID, since it'll have been
        // created first. Ideally, the org-wide team would have a flag that we could use to identify it,
        (teamsData?.teams?.reduce((acc, team) => {
          if (team.id < acc.id) {
            return team;
          }
          return acc;
        }))?.id
        || -1
      )
    );
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
