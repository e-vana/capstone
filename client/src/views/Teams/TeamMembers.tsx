import { Stack, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { TeamContext } from "./TeamContext";
import MemberList from "../../components/Members/MemberList";
const TeamMembers = () => {
  const { members } = useContext(TeamContext);

  return (
    <Stack>
      <Heading size="md">Members</Heading>
      <MemberList members={members} />
    </Stack>
  );
};

export default TeamMembers;
