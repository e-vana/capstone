import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Select,
  Spinner,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useToast,
} from "@chakra-ui/react";
import { getUsers, waitWrapper } from "../api/users.api";
import { FunctionComponent, useEffect, useState } from "react";
import ErrorMessage from "../components/Error";
import UserCard from "../components/User/userCard";
import { iUser } from "../interfaces/user.interface";
import { getOrganizations } from "../api/organizations.api";
import { getEvents } from "../api/events.api";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const HomeView: FunctionComponent = () => {
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
        message="Cant find users. Make sure you start the server!"
        flex={1}
      />
    ),
    success: () => (
      <Box w="100%" p={4}>
        <Heading marginBottom={"20px"}>Hey, User</Heading>
        <Heading as="h6" size="xs" marginBottom={"5px"}>
          Organizations
        </Heading>
        {orgData && (
          <>
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
          </>
        )}
        <Heading as="h4" size="md" marginBottom={"5px"}>
          Events
        </Heading>
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
                    <Th>Description</Th>
                    <Th>Location</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {eventData.events.map((e) => {
                    return (
                      <>
                        <Tr>
                          <Td>{e.name}</Td>
                          <Td>{e.description}</Td>
                          <Td>
                            {e.address_street}, {e.address_city},{" "}
                            {e.address_state} {e.address_zipcode}
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
      </Box>
    ),
  };

  if (orgIsLoading) return renderState.loading;
  else if (orgIsError) return renderState.error;
  else if (orgData?.organizations) return renderState.success();
};

export default HomeView;
