import {
  Stack,
  Heading,
  Skeleton,
  Card,
  CardBody,
  HStack,
  Button,
  Icon,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronRightIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import OrganizationContext from "./OrganizationContext";
import AddTeam from "../../components/AddModal/AddTeam";

const OrganizationTeams = () => {
  const { orgData, teamsData, teamsLoading } = useContext(OrganizationContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardBg = useColorModeValue("white", "#121212");
  return (
    <Stack alignSelf={"start"} width={"100%"}>
      <HStack width={"100%"} justifyContent={"flex-start"}>
        <Heading size={"sm"}>Teams: </Heading>
        <Button colorScheme={"gray"} size={"sm"} onClick={onOpen}>
          <Icon as={PlusSquareIcon} />
        </Button>
      </HStack>
      {teamsLoading && (
        <Skeleton
          width={"100%"}
          height={"70px"}
          isLoaded={teamsLoading}
          rounded={"md"}
        />
      )}
      {/* will add table for desktop later */}
      {teamsData &&
        teamsData.teams.map((team) => (
          <Card
            key={"OrgTeamCardId" + team.id}
            width={"100%"}
            align={"center"}
            justifyContent={"space-between"}
            display={{ base: "flex", md: "flex" }}
            bg={cardBg}
            border={"1px solid"}
            borderColor={"whiteAlpha.300"}
          >
            <CardBody width={"100%"}>
              <HStack width={"100%"} justifyContent={"space-between"}>
                <Heading size={"sm"}>{team.name}</Heading>
                <Button
                  as={RouterLink}
                  gap={3}
                  alignSelf={"end"}
                  to={"teams/" + team.id}
                >
                  Go to Team Page
                  <Icon as={ChevronRightIcon} />
                </Button>
              </HStack>
            </CardBody>
          </Card>
        ))}
      <AddTeam
        isOpen={isOpen}
        onClose={onClose}
        orgId={orgData?.id || -1}
        orgName={orgData?.name || ""}
      />
    </Stack>
  );
};

export default OrganizationTeams;
