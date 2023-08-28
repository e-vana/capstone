import { Card, HStack, Avatar, Text } from "@chakra-ui/react";
import { UserCardComponent } from "./types";

const UserCard: UserCardComponent = ({ user }) => {
  return (
    <Card key={user.email} minW={"200px"} p={3}>
      <HStack>
        <Avatar name={user.first_name + " " + user.last_name} size={"md"} />
        <Text>
          {user.first_name} {user.last_name}
        </Text>
      </HStack>
    </Card>
  );
};

export default UserCard;
