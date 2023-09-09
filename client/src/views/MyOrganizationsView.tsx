import {
  Box,
  Heading,
  Select,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEvents } from "../api/events.api";
import { getOrganizations } from "../api/organizations.api";
import ErrorMessage from "../components/Error";
import { AddIcon } from "@chakra-ui/icons";
const MyOrganizationsView: FunctionComponent = () => {
  const {
    data: orgData,
    isLoading: orgIsLoading,
    isError: orgIsError,
  } = useQuery({
    queryKey: ["getOrganizations"],
    queryFn: getOrganizations,
  });

  const {
    data: eventData,
    isLoading: eventIsLoading,
    isError: eventIsError,
    refetch: refetchEvents,
    isRefetching: eventIsRefetching,
  } = useQuery("getEvents", () => getEvents(selectedOrganization), {
    enabled: false,
  });

  const [selectedOrganization, setSelectedOrganization] = useState<number>(1);
  useEffect(() => {
    refetchEvents();
  }, [selectedOrganization]);
  const renderState = {
    loading: (
      <Stack align={"center"} height={"100%"} flex={1} justify={"center"}>
        <Spinner color={"green"} size={"xl"} />
      </Stack>
    ),
    error: (
      <ErrorMessage
        code={404}
        message="Cant find organizations. Make sure you start the server!"
        flex={1}
      />
    ),
    success: () => (
      <Stack style={{ height: "100vh" }} w="100%" p={4} flex={1}>
        <Heading as="h1" size="lg" marginBottom={"20px"}>
          My Organizations
        </Heading>
        <Heading as="h6" size="xs" marginBottom={"5px"}>
          Select an organization
        </Heading>
        {orgData && (
          <>
            <div style={{ display: "flex", justifyItems: "center" }}>
              <Select
                width={"200px"}
                marginBottom={"50px"}
                onChange={(e) => {
                  setSelectedOrganization(parseInt(e.target.value));
                }}
              >
                {orgData &&
                  orgData.organizations.map((org) => {
                    return <option value={org.id}>{org.name}</option>;
                  })}
              </Select>
              <IconButton
                aria-label="Create new organization"
                icon={<AddIcon />}
                marginLeft={"5px"}
              ></IconButton>
            </div>
          </>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Heading as="h4" size="md" marginBottom={"5px"}>
            Events
          </Heading>
          <IconButton
            aria-label="Create new event"
            icon={<AddIcon />}
            marginLeft={"5px"}
            size="xs"
          ></IconButton>
        </div>

        {eventIsRefetching && (
          <Stack align={"center"} height={"100%"} flex={1} justify={"center"}>
            <Spinner color={"green"} size={"xl"} />
          </Stack>
        )}

        {eventData && !eventIsRefetching && (
          <>
            <TableContainer>
              <Table variant="simple">
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
                  {eventData.events.map((e) => {
                    return (
                      <>
                        <Tr>
                          <Td>
                            {e.name}
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
                                  {new Date(e.start_time).toLocaleTimeString()}{" "}
                                  to {new Date(e.end_time).toLocaleTimeString()}
                                </Text>
                              </div>
                            </>
                          </Td>
                          <Td>{e.description}</Td>
                          <Td>
                            {e.address_street}, {e.address_city},{" "}
                            {e.address_state} {e.address_zipcode}
                          </Td>
                          <Td>
                            <Button variant="solid">View Event</Button>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Stack>
    ),
  };

  if (orgIsLoading) return renderState.loading;
  else if (orgIsError) return renderState.error;
  else if (orgData?.organizations) return renderState.success();
};

export default MyOrganizationsView;
