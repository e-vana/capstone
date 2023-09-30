import {
  Stack,
  Heading,
  Card,
  CardBody,
  HStack,
  Avatar,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import OrganizationContext from "./OrganizationContext";

const OrganizationMembers = () => {
  const cardBg = useColorModeValue("white", "#505050");

  const { members } = useContext(OrganizationContext);

  return (
    <Stack width={"100%"} alignSelf={"start"}>
      <Heading size={"sm"}>Members: </Heading>
      {members?.map((member) => (
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
  );
};

export default OrganizationMembers;
