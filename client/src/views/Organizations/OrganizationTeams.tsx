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
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import OrganizationContext from "./OrganizationContext";

const OrganizationTeams = () => {
  const { teamsData, teamsLoading } = useContext(OrganizationContext);
  const cardBg = useColorModeValue("white", "#505050");
  return (
    <Stack alignSelf={"start"} width={"100%"}>
      <Heading size={"sm"}>Teams: </Heading>
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
          <>
            <Card
              width={"100%"}
              align={"center"}
              justifyContent={"space-between"}
              display={{ base: "flex", md: "flex" }}
              bg={cardBg}
            >
              <CardBody width={"100%"}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                  <Heading size={"sm"}>{team.name}</Heading>
                  <Button
                    gap={3}
                    alignSelf={"end"}
                    as={RouterLink}
                    to={"teams/" + team.id}
                  >
                    Go to Team Page
                    <Icon as={ChevronRightIcon} />
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          </>
        ))}
    </Stack>
  );
};

export default OrganizationTeams;
