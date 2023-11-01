import { Flex, Heading, Stack } from "@chakra-ui/react";
import { TeamContext } from "./TeamContext";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTeam } from "../../api/teams.api";
import { TeamHeader } from "./TeamHeader";
import EventList from "../Events/EventList";
import { getEventsInATeam } from "../../api/events.api";
import { useAppDispatch } from "../../app/hooks";
import {
  setEvents,
  setOrg,
  setTeam,
} from "../../features/Organizations/organizationSlice";
import { FAKE_MEMBERS } from "../Organizations/OrganizationPage";
import TeamMembers from "./TeamMembers";
import { useEffect } from "react";

const TeamPage = () => {
  const { organizationId, teamId } = useParams();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useQuery("getTeam", () =>
    getTeam(+organizationId!, +teamId!)
  );
  
  // When the team data is loaded, set the team (and parent org) in the redux store
  useEffect(() => {
    console.log("Team Page: Render");
    if (!teamId) {
      throw new Error("No team ID was passed to Team page");
      // TODO: Redirect back to organization-page
    }
    dispatch(setTeam(+teamId!));
    dispatch(setOrg(+organizationId!));
  }, [teamId, data]);

  const { data: eventData } = useQuery(
    "getEventsByTeam",
    () => getEventsInATeam(+organizationId!, +teamId!),
    {
      onSuccess: (data) => dispatch(setEvents(data.events)),
    }
  );

  return (
    <TeamContext.Provider
      value={{
        teamData: data?.team,
        teamLoading: isLoading,
        members: FAKE_MEMBERS,
      }}
    >
      <Stack flex={1} justify={"start"} p={5}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          width={"100%"}
          justify={"space-between"}
          gap={5}
        >
          <Stack width={{ base: "100%", md: "35%" }}>
            <TeamHeader>
              <Heading size={"md"} textAlign={"center"}>
                {data?.team.name}
              </Heading>
            </TeamHeader>

            <TeamMembers />
          </Stack>
          <Stack width={{ base: "100%", md: "65%" }} height={"100%"}>
            <EventList />
          </Stack>
        </Flex>
      </Stack>
    </TeamContext.Provider>
  );
};

export default TeamPage;
