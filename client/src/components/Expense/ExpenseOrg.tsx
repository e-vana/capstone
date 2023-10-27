import { ChangeEvent } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getOrganizations } from "../../api/organizations.api";
import { getTeams } from "../../api/teams.api";
import { OrgFormComponent } from "./types";
import { getEventsInATeam } from "../../api/events.api";

const ExpenseOrg: OrgFormComponent = ({ data, setData }) => {
  const { data: OrgData } = useQuery("getOrganizations", getOrganizations);
  const { data: TeamData } = useQuery(
    ["getTeams", data.orgID],
    () => getTeams(data.orgID),
    {
      enabled: data.orgID !== undefined,
    }
  );
  const { data: EventData } = useQuery(
    ["getEvents", data.orgID, data.teamID],
    () => getEventsInATeam(data.orgID, data.teamID),
    {
      enabled: data.teamID !== undefined,
    }
  );

  const handleOrgChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      orgID: +e.currentTarget.value,
    });
  };

  const handleTeamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      teamID: +e.currentTarget.value,
    });
  };

  const handleEventChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      eventID: +e.currentTarget.value,
    });
  };

  return (
    <Stack gap={5} justifyContent={"start"}>
      <Heading size={"md"}>Select Organization or Team</Heading>
      <Flex gap={5} direction={{ base: "column", md: "column" }}>
        <FormControl isRequired>
          <FormLabel>Organization</FormLabel>
          <Select
            value={data.orgID}
            onChange={handleOrgChange}
            variant={"filled"}
            color={useColorModeValue("#303030", "whiteAlpha.900")}
          >
            <option value={-1}>Select an Organization</option>
            {OrgData?.organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Team</FormLabel>
          <Select
            value={data.teamID}
            onChange={handleTeamChange}
            variant={"filled"}
            color={useColorModeValue("#303030", "whiteAlpha.900")}
            isDisabled={TeamData?.teams?.length === 0}
          >
            <option value={undefined}>Select a Team</option>
            {TeamData?.teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Event</FormLabel>
          <Select
            value={data.eventID}
            onChange={handleEventChange}
            variant={"filled"}
            color={useColorModeValue("#303030", "whiteAlpha.900")}
            isDisabled={
              EventData?.events.length === 0 || TeamData?.teams.length === 0
            }
          >
            <option>Select an Event</option>
            {EventData?.events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>
    </Stack>
  );
};

export default ExpenseOrg;
