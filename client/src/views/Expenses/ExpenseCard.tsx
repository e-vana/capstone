import {
  Stack,
  Avatar,
  Heading,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ExpenseCardComponent } from "./types";
import TileModal from "../../components/Tile/TileModal";

const ExpenseCard: ExpenseCardComponent = ({ expense }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        justify={"space-between"}
        height={"100%"}
        align={"center"}
        my={5}
        onClick={onOpen}
        cursor={"pointer"}
      >
        <Stack direction="row" gap={3} height={"100%"} align={"center"}>
          <Avatar name={expense.organization_name} size={"sm"} />
          <Stack>
            <Heading size={"sm"}>{expense.organization_name}</Heading>
            <Text fontSize={"sm"}>{expense.description}</Text>
          </Stack>
        </Stack>

        <Heading size={"md"}>${expense.amount}</Heading>
      </Stack>
      <TileModal
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: "full", md: "xl" }}
      >
        <Stack
          my={10}
          width={"100%"}
          align={"center"}
          justify={"space-between"}
          height={"100%"}
          gap={20}
        >
          <Stack width={{ base: "100%", md: "50%" }} align={"center"}>
            <Avatar size={"lg"} name={expense.organization_name} />
            <Heading size={"lg"}>{expense.organization_name}</Heading>
            <Text>{expense.description}</Text>
          </Stack>
          <Stack width={{ base: "100%", md: "50%" }} p={10} align={"center"}>
            <Heading size={"4xl"}>${expense.amount}</Heading>
          </Stack>
          <Stack width={{ base: "100%", md: "50%" }}>
            <Button width={"100%"} rounded={"full"} colorScheme="purple">
              View Receipt
            </Button>
          </Stack>
        </Stack>
      </TileModal>
    </>
  );
};

export default ExpenseCard;
