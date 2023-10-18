import {
  Card,
  CardBody,
  HStack,
  Avatar,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { MemberListComponent } from "./types";

const MemberList: MemberListComponent = ({ members }) => {
  const cardBg = useColorModeValue("white", "#505050");

  return (
    <>
      {members.map((member) => (
        <Card bg={cardBg} key={"OrgMemberCardName" + member.name}>
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
    </>
  );
};

export default MemberList;
