import { Heading, Stack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import OrganizationContext from "./OrganizationContext";
import { useAppDispatch } from "../../app/hooks";
import { setEvents } from "../../features/Organizations/organizationSlice";
import EventList from "../Events/EventList";

const OrganizationEvents = () => {
  const { eventsData } = useContext(OrganizationContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (eventsData?.events !== undefined) {
      dispatch(setEvents(eventsData?.events));
    }
  }, [eventsData?.events, dispatch]);

  return (
    <Stack alignSelf={"start"} width={"100%"}>
      <Heading size={"sm"}>Events: </Heading>
      <EventList />
    </Stack>
  );
};

export default OrganizationEvents;
