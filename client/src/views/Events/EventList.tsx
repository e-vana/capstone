import {
  Alert,
  AlertIcon,
  HStack,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { EventsListComponent } from "./types";
import { AddIcon } from "@chakra-ui/icons";
import { EventTable } from "./EventTable";
import EventCards from "./EventCards";
import { useAppSelector } from "../../app/hooks";
import { useDisclosure } from "@chakra-ui/hooks";
import AddEvent from "../../components/AddModal/AddEvent";
import OrganizationContext from "../Organizations/OrganizationContext";
import { useContext } from "react";

import { iTeam } from "../../interfaces/teams.interface";

const EventList: EventsListComponent = () => {
  // Need to know the org and team we're working with
  // TODO: This information could be retrieved from the redux store, context or props?
  const { orgData, teamsData } = useContext(OrganizationContext);

  const { events, selectedOrg, selectedTeam } = useAppSelector((state) => state.organizations);

  // Get the selected team's name to display in the header
  const selectedTeamName = teamsData?.teams.find(
    (team: iTeam) => team.id === selectedTeam
  )?.name;

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <Stack>
        <HStack>
          <Heading size={"md"} mb={"5px"}>
            All Events
          </Heading>
        </HStack>
        {/* TODO: Limit this to admins/authorized users */}
        <Heading size={"sm"}>Add an Event</Heading>
        <IconButton
          aria-label="Create new event"
          icon={<AddIcon />}
          marginLeft={"5px"}
          size="md"
          onClick={onOpen}
        />
      </Stack>
      {events && events.length == 0 && (
        <Stack spacing={3}>
          <Alert status="info">
            <AlertIcon />
            No events found for this team.
          </Alert>
        </Stack>
      )}
      {events && events.length > 0 && (
        <>
          <EventTable showTeamName={true} />
          <EventCards />
        </>
      )}
      {/* TODO: Don't show the Add Event option for unauthorized users */}
      <AddEvent orgId={selectedOrg} orgName={orgData?.name || ""}
        teamId={selectedTeam} teamName={selectedTeamName || ""}
        isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default EventList;
