import {
  Alert,
  AlertIcon,
  HStack,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { EventsListComponent } from "./types";
import { AddIcon } from "@chakra-ui/icons";
import { EventTable } from "./EventTable";
import EventCards from "./EventCards";
import { useAppSelector } from "../../app/hooks";

const EventList: EventsListComponent = () => {
  const { events } = useAppSelector((state) => state.organizations);

  return (
    <>
      <Stack>
        <HStack>
          <Heading size={"md"} mb={"5px"}>
            Events
          </Heading>
        </HStack>
        <Heading size={"sm"}>Add an Event</Heading>
        <IconButton
          aria-label="Create new event"
          icon={<AddIcon />}
          marginLeft={"5px"}
          size="md"
        />
      </Stack>
      {events && events.length == 0 && (
        <Stack spacing={3}>
          <Alert status="info">
            <AlertIcon />
            No events found for this team.
          </Alert>
        </Stack>
      )}
      {events && events.length > 0 && (
        <>
          <EventTable />
          <EventCards />
        </>
      )}
    </>
  );
};

export default EventList;
