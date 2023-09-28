import { HStack, Heading, IconButton, Select, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { OrgFilterComponent } from "./types";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setOrg,
  setTeam,
} from "../../features/Organizations/organizationSlice";
import { useQueryClient } from "react-query";

export const OrgFilter: OrgFilterComponent = () => {
  const { organizations, teams } = useAppSelector(
    (state) => state.organizations
  );
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  function handleSelectOrg(e: ChangeEvent<HTMLSelectElement>) {
    dispatch(setOrg(+e.target.value));
    dispatch(setTeam(0));
    queryClient.invalidateQueries(["getEvents"]);
  }

  function handleSelectTeam(e: ChangeEvent<HTMLSelectElement>) {
    dispatch(setTeam(+e.target.value));
    queryClient.refetchQueries(["getTeams", "getEvents"]);
  }

  return (
    <Stack>
      <Stack>
        <Heading size={"md"}>Organizations</Heading>
        <Stack alignItems={{ base: "start", md: "center" }}>
          <HStack width={{ base: "50%", md: "100%" }} justify={"space-between"}>
            <Heading size={"xs"} mb={"5px"}>
              Select an Organization
            </Heading>
            <IconButton
              aria-label="Create new organization"
              icon={<AddIcon />}
              marginLeft={"5px"}
              marginBottom={"6px"}
              size="xs"
            />
          </HStack>
          <Select
            width={{ base: "50%", md: "200px" }}
            mb={"10px"}
            onChange={(e) => handleSelectOrg(e)}
          >
            {organizations &&
              organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
          </Select>
        </Stack>
      </Stack>
      <Stack alignItems={{ base: "start", md: "center" }}>
        <HStack width={{ base: "50%", md: "100%" }} justify={"space-between"}>
          <Heading size={"xs"} mb={"5px"}>
            Select a Team
          </Heading>
          <IconButton
            aria-label="Create new team"
            icon={<AddIcon />}
            marginLeft={"5px"}
            marginBottom={"10px"}
            size="xs"
          />
        </HStack>
        <Select
          width={{ base: "50%", md: "200px" }}
          marginBottom={"10px"}
          defaultValue={0}
          onChange={(e) => handleSelectTeam(e)}
        >
          <option value={0}>No team selected</option>
          {teams &&
            teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </Select>
      </Stack>
    </Stack>
  );
};
