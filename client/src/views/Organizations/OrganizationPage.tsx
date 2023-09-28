import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  Button,
  Stack,
  Heading,
  Text,
  HStack,
  CardFooter,
  Icon,
  useDisclosure,
  Skeleton,
  CardBody,
  Avatar,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiQrCode } from "react-icons/hi2";
import TileModal from "../../components/Tile/TileModal";
import OrganizationTile from "../../components/Tile/OrganizationTile";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getOrganization } from "../../api/organizations.api";
import { getTeams } from "../../api/teams.api";

const FAKE_MEMBERS = [
  {
    name: "Tony Pizza",
  },
  {
    name: "Megatron",
  },
  {
    name: "Walter White",
  },
  {
    name: "Johnny Bravo",
  },
  {
    name: "Shrek",
  },
];

const OrganizationPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { organizationId } = useParams();

  const cardBg = useColorModeValue("white", "#505050");

  const { data: orgData, isLoading: orgLoading } = useQuery(
    "getOrganization",
    () => getOrganization(+organizationId!)
  );

  const { data: teamsData, isLoading: teamsLoading } = useQuery(
    "getTeams",
    () => getTeams(+organizationId!)
  );

  console.log(teamsData);

  return (
    <Stack flex={1} justify={"start"} align={"center"} padding={5} gap={5}>
      <Card width={"100%"} maxW={"500px"} minHeight={"30%"} bg={cardBg}>
        <CardHeader
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={3}
        >
          <Skeleton
            width={"100%"}
            height={"fit-content"}
            isLoaded={!orgLoading}
          >
            <Heading textAlign={"center"}>
              {!orgLoading && orgData?.name}
            </Heading>
          </Skeleton>
          <Text fontSize={"sm"} align={"center"} width={"75%"}>
            You have {"1"} event(s) scheduled. {"1"} in progress and {"0"}{" "}
            completed.
          </Text>
        </CardHeader>
        <CardFooter>
          <HStack width={"100%"} justifyContent={"space-between"}>
            <Button
              width={"100%"}
              variant={"outline"}
              rounded={"md"}
              gap={3}
              colorScheme="blue"
            >
              Manage
              <Icon as={SettingsIcon} />
            </Button>
            <Button
              width={"100%"}
              variant={"outline"}
              rounded={"md"}
              gap={3}
              colorScheme="green"
              onClick={onOpen}
            >
              View QR Code
              <Icon as={HiQrCode} />
            </Button>
          </HStack>
        </CardFooter>
      </Card>
      <Flex
        width="100%"
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        gap={5}
        zIndex={1}
      >
        <Stack alignSelf={"start"} width={{ base: "100%", md: "45%" }}>
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

                      <Button gap={3} alignSelf={"end"}>
                        Go to Team Page
                        <Icon as={ChevronRightIcon} />
                      </Button>
                    </HStack>
                  </CardBody>
                </Card>
              </>
            ))}
        </Stack>
        <Stack width={{ base: "100%", md: "45%" }} alignSelf={"start"}>
          <Heading size={"sm"}>Members: </Heading>
          {FAKE_MEMBERS.map((member) => (
            <Card bg={cardBg}>
              <CardBody width={"100%"}>
                <HStack width={"100%"} justifyContent={"space-between"}>
                  <HStack gap={5}>
                    <Avatar name={member.name} size={"sm"} />
                    <Heading size={"sm"}>{member.name}</Heading>
                  </HStack>
                  <Button>View Member</Button>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Flex>
      <TileModal isOpen={isOpen} onClose={onClose}>
        {orgData !== undefined && <OrganizationTile organization={orgData} />}
      </TileModal>
    </Stack>
  );
};

export default OrganizationPage;
