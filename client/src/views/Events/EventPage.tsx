import { Heading, Stack, Card } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getEventInAnOrg } from "../../api/events.api";
import EventContext from "./EventContext";
import EventHeader from "./EventHeader";

const EventPage = () => {
  const { organizationId, eventId } = useParams();

  console.log(organizationId, eventId);

  const { data, isLoading } = useQuery("getEvent", () =>
    getEventInAnOrg(+organizationId!, +eventId!)
  );

  return (
    <Stack flex={1}>
      <EventContext.Provider
        value={{
          eventData: data?.event,
          eventLoading: isLoading,
        }}
      >
        <EventHeader>{data?.event.event_name}</EventHeader>
      </EventContext.Provider>
    </Stack>
  );
};

export default EventPage;
