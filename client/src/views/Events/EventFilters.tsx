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
import AddOrg from "../../components/AddModal/AddOrg";
import AddTeam from "../../components/AddModal/AddTeam";
import { useDisclosure } from "@chakra-ui/react";

export const OrgFilter: OrgFilterComponent = () => {
  const { organizations, teams, selectedOrg, selectedTeam } = useAppSelector(
    (state) => state.organizations
  );

  const selectedOrgName = useAppSelector(
    (state) =>
      state.organizations.organizations.find(
        (org) => org.id === state.organizations.selectedOrg
      )?.name
  );

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

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
          <HStack
            width={{ base: "100%", md: "100%" }}
            justify={"space-between"}
          >
            <Heading size={"xs"} mb={"5px"}>
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
          </HStack>
          <Select
            width={{ base: "100%", md: "200px" }}
            mb={"10px"}
            onChange={(e) => handleSelectOrg(e)}
            defaultValue={selectedOrg}
          >
            {organizations &&
              organizations.map((org) => (
                <option key={"EventFiltersOrgId" + org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
          </Select>
        </Stack>
      </Stack>
      <Stack alignItems={{ base: "start", md: "center" }}>
        <HStack width={{ base: "100%", md: "100%" }} justify={"space-between"}>
          <Heading size={"xs"} mb={"5px"}>
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
        </HStack>
        <Select
          width={{ base: "100%", md: "200px" }}
          marginBottom={"10px"}
          defaultValue={selectedTeam || 0}
          onChange={(e) => handleSelectTeam(e)}
        >
          <option value={0}>No team selected</option>
          {teams &&
            teams.map((team) => (
              <option key={"EventFiltersTeamId" + team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </Select>
      </Stack>
      {/* TODO: Adding an org here does not refresh the list of orgs in the dropdown */}
      <AddOrg isOpen={isAddOrgOpen} onClose={onAddOrgClose} />
      {selectedOrg && organizations.length > 0 && (
        <AddTeam
          isOpen={isAddTeamOpen}
          onClose={onAddTeamClose}
          orgId={selectedOrg}
          orgName={selectedOrgName || ""}
        />
      )}
    </Stack>
  );
};
