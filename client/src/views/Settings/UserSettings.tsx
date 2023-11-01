import {
  Avatar,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAppSelector } from "../../app/hooks";

const UserSettings = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Stack width={"100%"} align={"center"}>
      <Card
        background={useColorModeValue("gray.100", "whiteAlpha.300")}
        width={{ base: "95%", md: "500px" }}
      >
        <CardBody width={"100%"} gap={5} display={"flex"} flexDir={"column"}>
          <Stack width={"100%"} align={"center"}>
            <Avatar
              name={user?.first_name + " " + user?.last_name}
              size={"lg"}
            />
            <Heading>{user?.first_name + " " + user?.last_name}</Heading>
            <Text>{user?.email}</Text>
          </Stack>
          <Button width={"100%"} rounded={"full"}>
            Edit Profile
          </Button>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default UserSettings;
