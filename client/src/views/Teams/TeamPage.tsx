import { Heading, Stack } from "@chakra-ui/react";
import { TeamContext } from "./TeamContext";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTeam } from "../../api/teams.api";
import { TeamHeader } from "./TeamHeader";
import EventList from "../Events/EventList";
import { getEventsInATeam } from "../../api/events.api";
import { useAppDispatch } from "../../app/hooks";
import { setEvents } from "../../features/Organizations/organizationSlice";

const TeamPage = () => {
  const { organizationId, teamId } = useParams();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useQuery("getTeam", () =>
    getTeam(+organizationId!, +teamId!)
  );

  const { data: eventData } = useQuery(
    "getEventsByTeam",
    () => getEventsInATeam(+organizationId!, +teamId!),
    {
      onSuccess: (data) => dispatch(setEvents(data.events)),
    }
  );

  console.log(eventData?.events);

  return (
    <TeamContext.Provider
      value={{
        teamData: data?.team,
        teamLoading: isLoading,
      }}
    >
      <Stack flex={1} justify={"start"} p={5}>
        <TeamHeader>
          <Heading size={"md"} textAlign={"center"}>
            {data?.team.name}
          </Heading>
        </TeamHeader>
        <EventList />
      </Stack>
    </TeamContext.Provider>
  );
};

export default TeamPage;
