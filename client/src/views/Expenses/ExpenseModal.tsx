import { Stack, Avatar, Heading, Text, Button } from "@chakra-ui/react";
import TileModal from "../../components/Tile/TileModal";
import { ExpenseModalComponent } from "./types";

const ExpenseModal: ExpenseModalComponent = ({ isOpen, onClose, expense }) => {
  return (
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
  );
};

export default ExpenseModal;
