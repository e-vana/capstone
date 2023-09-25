import {
  Flex,
  Stack,
  Heading,
  IconButton,
  Alert,
  AlertIcon,
  HStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { OrgFilter } from "./EventFilters";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getOrganizations } from "../../api/organizations.api";
import { getTeams } from "../../api/teams.api";
import { getEventsInATeam } from "../../api/events.api";
import {
  setOrgs,
  setTeams,
  setEvents,
} from "../../features/Organizations/organizationSlice";
import { EventTable } from "./EventTable";
import EventCards from "./EventCards";

const EventsView = () => {
  const { events, selectedOrg, selectedTeam } = useAppSelector(
    (state) => state.organizations
  );
  const dispatch = useAppDispatch();

  useQuery({
    queryKey: ["getOrgs"],
    queryFn: getOrganizations,
    onSuccess: (data) => dispatch(setOrgs(data.organizations)),
  });

  const { refetch: refetchTeams } = useQuery({
    queryKey: ["getTeams"],
    queryFn: () => {
      console.log("Fetching teams for org: ", selectedOrg);
      return getTeams(selectedOrg);
    },
    onSuccess: (data) => dispatch(setTeams(data.teams)),
  });

  // fetch events
  const { refetch: refetchEvents } = useQuery({
    queryKey: ["getEvents"],
    queryFn: () => {
      console.log("Fetching events for team: ", selectedTeam);
      return getEventsInATeam(selectedOrg, selectedTeam);
    },
    enabled: selectedTeam > 0,
    onSuccess: (data) => dispatch(setEvents(data.events)),
  });

  useEffect(() => {
    if (selectedTeam !== null && selectedOrg !== null) {
      refetchTeams();
      refetchEvents();
    }
  }, [selectedTeam, selectedOrg, refetchTeams, refetchEvents]);

  return (
    <Flex gap={8} flexDir={{ base: "column", md: "row" }}>
      <Stack>
        <OrgFilter />
      </Stack>
      <Stack>
        <Stack>
          <Heading size={"md"}>Events</Heading>
          <Stack alignItems={"center"}>
            <HStack width={"100%"} alignItems={"center"}>
              <Heading size={"xs"} mb={"5px"}>
                Add an Event
              </Heading>
              <IconButton
                aria-label="Create new event"
                icon={<AddIcon />}
                marginLeft={"5px"}
                marginBottom={"6px"}
                size="xs"
              />
            </HStack>
          </Stack>
        </Stack>
        {events && events.length == 0 && (
          <Stack spacing={3}>
            <Alert status="info">
              <AlertIcon />
              No events found for this team.
            </Alert>
          </Stack>
        )}
        {selectedTeam == 0 && (
          <>
            <Stack spacing={3}>
              <Alert status="info">
                <AlertIcon />
                No team selected
              </Alert>
            </Stack>
          </>
        )}
        {events && events.length > 0 && selectedTeam !== 0 && (
          <>
            <EventTable />
            <EventCards />
          </>
        )}
      </Stack>
    </Flex>
  );
};

export default EventsView;
