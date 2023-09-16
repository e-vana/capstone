import {
  Card,
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
  CardFooter,
  Icon,
  useColorModeValue,
  useDisclosure,
  Alert,
  AlertIcon,
  Skeleton,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import { getEvents, getEventsInATeam } from "../api/events.api";
import { getOrganizations } from "../api/organizations.api";
import ErrorMessage from "../components/Error";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import "./table.css";
import AddOrg from "../components/AddModal/AddOrg";
import { getTeams } from "../api/teams.api";

const MyOrganizationsView: FunctionComponent = () => {
  const {
    data: orgData,
    isLoading: orgIsLoading,
    isError: orgIsError,
    refetch: refetchOrgs,
    isRefetching: orgsIsRefetching,
  } = useQuery({
    queryKey: ["getOrganizations"],
    queryFn: getOrganizations,
  });

  const {
    data: teamData,
    isLoading: teamIsLoading,
    isError: teamIsError,
    refetch: refetchTeams,
    isRefetching: teamIsRefetching,
  } = useQuery("getTeams", () => getTeams(selectedOrganization), {
    enabled: false,
  });
  const {
    data: eventData,
    isLoading: eventIsLoading,
    isError: eventIsError,
    refetch: refetchEvents,
    isRefetching: eventIsRefetching,
  } = useQuery(
    "getEvents",
    () => getEventsInATeam(selectedOrganization, selectedTeam),
    {
      enabled: false,
    }
  );

  const [selectedOrganization, setSelectedOrganization] = useState<number>(1);
  const [selectedTeam, setSelectedTeam] = useState<number>(1);

  useEffect(() => {
    refetchTeams();
  }, [selectedOrganization]);

  useEffect(() => {
    refetchEvents();
  }, [selectedOrganization, selectedTeam]);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Stack w="100%" p={4} flex={1} height={"fit-content"}>
        <Heading as="h1" size="lg" marginBottom={"20px"}>
          My Organizations
        </Heading>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Heading as="h4" size="xs" marginBottom={"5px"}>
            Select an Organization
          </Heading>
          <IconButton
            aria-label="Create new organization"
            icon={<AddIcon />}
            marginLeft={"5px"}
            marginBottom={"6px"}
            size="xs"
            onClick={onOpen}
          />
        </div>
        {orgData && (
          <>
            <div style={{ display: "flex", justifyItems: "center" }}>
              <Select
                width={"200px"}
                marginBottom={"10px"}
                onChange={(e) => {
                  setSelectedOrganization(parseInt(e.target.value));
                }}
              >
                {orgData &&
                  orgData.organizations.map((org) => {
                    return <option value={org.id}>{org.name}</option>;
                  })}
              </Select>
            </div>
          </>
        )}
        {!teamIsRefetching && (
          <div className="select-teams-wrapper">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Heading as="h4" size="xs" marginBottom={"10px"}>
                Select a Team
              </Heading>
              <IconButton
                aria-label="Create new team"
                icon={<AddIcon />}
                marginLeft={"5px"}
                marginBottom={"10px"}
                size="xs"
                onClick={onOpen}
              />
            </div>
            {teamData && teamData.teams.length == 0 && (
              <Stack spacing={3}>
                <Alert status="info">
                  <AlertIcon></AlertIcon>
                  No teams found for this organization. Try creating one!
                </Alert>
              </Stack>
            )}
            {teamData && teamData.teams.length > 0 && (
              <>
                <div style={{ display: "flex", justifyItems: "center" }}>
                  <Select
                    width={"200px"}
                    marginBottom={"50px"}
                    onChange={(e) => {
                      setSelectedTeam(parseInt(e.target.value));
                    }}
                  >
                    {teamData &&
                      teamData.teams.map((team) => {
                        return <option value={team.id}>{team.name}</option>;
                      })}
                  </Select>
                </div>
              </>
            )}
          </div>
        )}
        {/* Can tidy up this loading state, its a mess with all of the dependent API calls */}
        {eventIsRefetching && teamIsRefetching && (
          // <Stack align={"center"} height={"100%"} flex={1} justify={"center"}>
          //   <Spinner color={"green"} size={"xl"} />
          // </Stack>
          <Stack>
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
          </Stack>
        )}

        {eventData &&
          teamData &&
          teamData?.teams.length > 0 &&
          !teamIsRefetching &&
          !eventIsRefetching && (
            <>
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
                />
              </div>
              {eventData.events.length == 0 && (
                <Stack spacing={3}>
                  <Alert status="info">
                    <AlertIcon></AlertIcon>
                    No events found for this team.
                  </Alert>
                </Stack>
              )}
              {eventData.events.length > 0 && (
                <TableContainer display={{ base: "none", md: "initial" }}>
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
                                      {new Date(
                                        e.start_time
                                      ).toLocaleTimeString()}{" "}
                                      to{" "}
                                      {new Date(
                                        e.end_time
                                      ).toLocaleTimeString()}
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
              )}

              <Stack display={{ base: "initial", md: "none" }}>
                {eventData.events.map((e) => (
                  <Card
                    backgroundColor={useColorModeValue("white", "#505050")}
                    color={useColorModeValue("blackAlpha.700", "white")}
                  >
                    <CardFooter
                      width={"100%"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Heading size={"sm"}>{e.name}</Heading>
                      <Button
                        colorScheme="purple"
                        alignSelf={"end"}
                        variant={"outline"}
                        justifyContent={"space-between"}
                        width={"50%"}
                        as={RouterLink}
                        to={"/" + e.organization_id + "/" + e.name}
                      >
                        View Event <Icon as={ChevronRightIcon} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </Stack>
            </>
          )}
        <AddOrg isOpen={isOpen} onClose={onClose} />
      </Stack>
    ),
  };

  if (orgIsLoading) return renderState.loading;
  else if (orgIsError) return renderState.error;
  else if (orgData?.organizations) return renderState.success();
};

export default MyOrganizationsView;
