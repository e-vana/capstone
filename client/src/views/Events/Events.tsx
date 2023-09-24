import { Flex, Stack, Text } from "@chakra-ui/react";
import { OrgFilter } from "./EventFilters";
import { EventsComponent } from "./types";
import EventList from "./EventList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useQuery } from "react-query";
import { getEventsInATeam } from "../../api/events.api";
import { setEvents } from "../../features/Organizations/organizationSlice";

const Events: EventsComponent = () => {
  const { events, teams, selectedOrg, selectedTeam } = useAppSelector(
    (state) => state.organizations
  );
  const dispatch = useAppDispatch();
  const { data: eventData, isSuccess } = useQuery("getEvents", () =>
    getEventsInATeam(selectedOrg, selectedTeam)
  );

  if (isSuccess) {
    dispatch(setEvents(eventData.events));
  }

  return (
    <Flex gap={8}>
      <Stack>
        <OrgFilter />
        <Text>{events.length ? events[0].name : "no events"}</Text>
      </Stack>
      <Stack>
        <EventList />
      </Stack>
    </Flex>
  );
};

export default Events;
