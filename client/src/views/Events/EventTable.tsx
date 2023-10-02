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

export const EventTable: EventTableComponent = ({ ...rest }) => {
  const { events, selectedOrg } = useAppSelector(
    (state) => state.organizations
  );
  console.log(events[0]);
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
            <Th>Date & Time</Th>
            <Th>Description</Th>
            <Th>Location</Th>
            <Th>Options</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((e) => (
            <>
              <Tr>
                <Td>
                  {e.event_name}
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
                <Td>
                  <>
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
                <Td>{e.event_description}</Td>
                <Td>
                  {e.address_street}, {e.address_city}, {e.address_state}{" "}
                  {e.address_zipcode}
                </Td>
                <Td>
                  <Button
                    as={RouterLink}
                    variant="solid"
                    size={"sm"}
                    to={"/d" + "/" + selectedOrg + "/" + e.event_id}
                  >
                    View Event
                  </Button>
                </Td>
              </Tr>
            </>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
