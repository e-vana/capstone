import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { EventTableComponent } from "./types";
import { useAppSelector } from "../../app/hooks";
import AddToCalendar from "../../components/AddModal/Calendar/AddToCalendar";
import { format } from "date-fns";

export const EventTable: EventTableComponent = ({
  showTeamName = false,
  ...rest
}) => {
  const { events, selectedOrg } = useAppSelector(
    (state) => state.organizations
  );

  console.log("Events pulled from Redux in EventsTable: ", events);

  return (
    <TableContainer
      {...rest}
      display={{ base: "none", md: "table-row" }}
      fontSize={"sm"}
      width={"fit-content"}
    >
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            {showTeamName && <Th>Team</Th>}
            <Th>Date & Time</Th>
            <Th>Description</Th>
            <Th>Location</Th>
            <Th>Options</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((e) => (
            <Tr key={"EventTableTd" + e?.event_id}>
              <Td>
                {e?.event_name || e?.name || "Unnamed Event"}
                {new Date(Date.now()) > new Date(e.end_time) ? (
                  <Badge
                    marginLeft={"5px"}
                    fontSize="xx-small"
                    colorScheme="orange"
                  >
                    Completed
                  </Badge>
                ) : (
                  <Badge
                    marginLeft={"5px"}
                    fontSize="xx-small"
                    colorScheme="green"
                  >
                    Upcoming
                  </Badge>
                )}
              </Td>
              {showTeamName && <Td>{e.team_name}</Td>}
              <Td>
                <>
                  {/* TODO: For some reason the events don't have date keys here */}
                  <div style={{ display: "block" }}>
                    <Text fontSize="xs">
                      {new Date(e.start_time).toDateString()}
                    </Text>
                  </div>
                  <div style={{ display: "block" }}>
                    <Text fontSize="md">
                      {new Date(e.start_time).toLocaleTimeString()} to{" "}
                      {new Date(e.end_time).toLocaleTimeString()}
                    </Text>
                  </div>
                </>
              </Td>
              <Td>{e.event_description || e?.description || ""}</Td>
              <Td>
                {e.address_street}, {e.address_city}, {e.address_state}{" "}
                {e.address_zipcode}
              </Td>
              <Td>
                <Stack direction={['column']} spacing={4} align='center'>
                  <Button
                    as={RouterLink}
                    variant="solid"
                    size={"sm"}
                    to={"/d" + "/" + selectedOrg + "/" + (e?.event_id || e?.id)}
                    data-testid={"eventsTableViewMoreBtn " + (e?.event_name || e?.name)}
                  >
                    View Event
                  </Button>
                  <AddToCalendar
                    name={e?.event_name || e?.name}
                    description={e.event_description}
                    location={e.address_street + e.address_city + e.address_state + "" + e.address_zipcode}
                    startDate={format(new Date(e.start_time), "yyy-MM-dd")}
                    endDate={format(new Date(e.end_time), "yyy-MM-dd")}
                    startTime={new Date(e.start_time).toTimeString().slice(0, 5)}
                    endTime={new Date(e.end_time).toTimeString().slice(0, 5)}
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
