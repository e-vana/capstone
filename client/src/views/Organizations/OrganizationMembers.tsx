import { Stack, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import OrganizationContext from "./OrganizationContext";
import MemberList from "../../components/Members/MemberList";

const OrganizationMembers = () => {
  const { members } = useContext(OrganizationContext);

  return (
    <Stack width={"100%"} alignSelf={"start"}>
      <Heading size={"sm"}>Members: </Heading>
      <MemberList members={members!} />
    </Stack>
  );
};

export default OrganizationMembers;
