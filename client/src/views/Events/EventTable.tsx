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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { EventTableComponent } from "./types";
import { useAppSelector } from "../../app/hooks";

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
            <Tr key={"EventTableTd" + e.event_id}>
              <Td>
                {/* TODO: For some reason the events have a .name instead of .event_name here */}
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
                <Button
                  as={RouterLink}
                  variant="solid"
                  size={"sm"}
                  to={"/d" + "/" + selectedOrg + "/" + (e?.event_id || e?.id)}
                >
                  View Event
                </Button>
                             
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
