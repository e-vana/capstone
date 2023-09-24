import {
  Card,
  Flex,
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
  HStack,
} from "@chakra-ui/react";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getEvents, getEventsInATeam } from "../api/events.api";
import { getOrganizations } from "../api/organizations.api";
import { getTeams } from "../api/teams.api";
import ErrorMessage from "../components/Error";
import "./table.css";
import AddOrg from "../components/AddModal/AddOrg";
import AddTeam from "../components/AddModal/AddTeam";
import { LoadingComponent } from "../components/Loading";

const EventsView: FunctionComponent = () => {
  const queryClient = useQueryClient();

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
  } = useQuery("getTeams", () => getTeams(selectedOrganization));

  const {
    data: eventData,
    isLoading: eventIsLoading,
    isError: eventIsError,
    refetch: refetchEvents,
    isRefetching: eventIsRefetching,
  } = useQuery("getEvents", () =>
    getEventsInATeam(selectedOrganization, selectedTeam)
  );

  const [selectedOrganization, setSelectedOrganization] = useState<number>(1);
  const [selectedTeam, setSelectedTeam] = useState<number>(1);

  // When the user selects a different organization or team, refetch the events or teams
  /*
  useEffect(() => {
    refetchTeams();
  }, [selectedOrganization]);

  useEffect(() => {
    refetchEvents();
  }, [selectedOrganization, selectedTeam]);

*/

  function refetchAll() {
    refetchOrgs();
    refetchTeams();
    refetchEvents();
  }

  function invalidateAllQueries() {
    queryClient.invalidateQueries([
      "getOrganizations",
      "getTeams",
      "getEvents",
    ]);
    refetchAll();
  }

  const handleOrgChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedOrganization(+e.target.value);
    invalidateAllQueries();
  };

  const handleTeamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedTeam(+e.target.value);
    invalidateAllQueries();
  };

  const {
    isOpen: isAddOrgOpen,
    onOpen: onAddOrgOpen,
    onClose: onAddOrgClose,
  } = useDisclosure();
  const {
    isOpen: isAddTeamOpen,
    onOpen: onAddTeamOpen,
    onClose: onAddTeamClose,
  } = useDisclosure();

  console.log(eventData?.events);
  console.log(orgData);

  const renderState = {
    loading: <LoadingComponent />,
    error: (
      <ErrorMessage
        code={404}
        message="Cant find organizations. Make sure you start the server!"
        flex={1}
      />
    ),
    success: () => (
      <Flex
        flexDir={{ base: "column", md: "row" }}
        w="100%"
        p={4}
        flex={1}
        height={"fit-content"}
        align={"start"}
        gap={5}
      >
        <Stack width={{ base: "100%", md: "initial" }}>
          <Heading size="md" marginBottom={"20px"}>
            Organizations
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
              onClick={onAddOrgOpen}
            />
          </div>
          {orgData && (
            <>
              <div style={{ display: "flex", justifyItems: "center" }}>
                <Select
                  width={"200px"}
                  marginBottom={"10px"}
                  onChange={(e) => handleOrgChange(e)}
                >
                  {orgData &&
                    orgData.organizations.map((org) => {
                      return (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      );
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
                  onClick={onAddTeamOpen}
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
                      onChange={(e) => handleTeamChange(e)}
                    >
                      {teamData &&
                        teamData.teams.map((team) => {
                          return (
                            <option key={team.id} value={team.id}>
                              {team.name}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
                </>
              )}
            </div>
          )}
        </Stack>
        <Stack overflow={"auto"} width={{ base: "100%", md: "initial" }}>
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
                  <Heading size="md" marginBottom={"5px"}>
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
                  <TableContainer
                    display={{ base: "none", md: "table-row" }}
                    fontSize={"sm"}
                    width={"fit-content"}
                  >
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
                                  {new Date(Date.now()) >
                                  new Date(e.end_time) ? (
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
                                  <Button
                                    as={RouterLink}
                                    variant="solid"
                                    size={"sm"}
                                    to={
                                      "/" + selectedOrganization + "/" + e.name
                                    }
                                  >
                                    View Event
                                  </Button>
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
                          to={"/" + selectedOrganization + "/" + e.name}
                        >
                          View Event <Icon as={ChevronRightIcon} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </Stack>
              </>
            )}
        </Stack>
        <AddOrg isOpen={isAddOrgOpen} onClose={onAddOrgClose} />
        <AddTeam
          orgId={selectedOrganization}
          orgName={
            orgData?.organizations.find(
              (org) => org.id === selectedOrganization
            )?.name || ""
          }
          isOpen={isAddTeamOpen}
          onClose={onAddTeamClose}
        />
      </Flex>
    ),
  };

  if (orgIsLoading || teamIsLoading) return renderState.loading;
  else if (orgIsError || teamIsError) return renderState.error;
  else if (orgData?.organizations) return renderState.success();
};

export default EventsView;
