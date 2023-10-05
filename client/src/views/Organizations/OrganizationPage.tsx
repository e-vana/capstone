import { Flex, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getOrganization } from "../../api/organizations.api";
import { getTeams } from "../../api/teams.api";
import { getEvents } from "../../api/events.api";
import OrganizationContainer from "./OrganizationContainer";
import OrganizationHeader from "./OrganizationHeader";
import OrganizationTeams from "./OrganizationTeams";
import OrganizationMembers from "./OrganizationMembers";
import OrganizationContext from "./OrganizationContext";
import OrganizationEvents from "./OrganizationEvents";

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
    () => getEvents(+organizationId!)
  );

  console.log(eventsData);

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
