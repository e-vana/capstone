import { Heading, Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getEventInAnOrg } from "../../api/events.api";

const EventPage = () => {
  const { organizationId, eventId } = useParams();
  console.log(organizationId, eventId);
  const { data } = useQuery(
    "getEvent",
    () => getEventInAnOrg(+organizationId!, +eventId!),
    {
      enabled: organizationId !== undefined && eventId !== undefined,
    }
  );

  console.log(data);

  return (
    <Stack flex={1}>
      <Heading>{data?.event.name}</Heading>
    </Stack>
  );
};

export default EventPage;
