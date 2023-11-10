import {
  Stack,
  Avatar,
  Heading,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { MilesCardComponent } from "./types";

const MilesCard: MilesCardComponent = ({ mileage }) => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      justify={"space-between"}
      height={"100%"}
      align={"center"}
      my={5}
      cursor={"pointer"}
    >
      <Stack direction="row" gap={3} height={"100%"} align={"center"}>
        <Avatar name={mileage.organization_name} size={"sm"} />
        <Stack>
          <Heading size={"sm"}>{mileage.organization_name}</Heading>
        </Stack>
      </Stack>
      <Flex height={"100%"} align={"end"} gap={1}>
        <Heading size={"md"}>{mileage.mileage}</Heading>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          mi
        </Text>
      </Flex>
    </Stack>
  );
};

export default MilesCard;
