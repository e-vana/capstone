import {
  Tooltip,
  IconButton,
  Icon,
  useDisclosure,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import AddExpense from "./AddExpense";
import { FunctionComponent } from "react";

const AddExpenseButton: FunctionComponent<IconButtonProps> = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="add expense">
        <IconButton
          variant={"ghost"}
          colorScheme="purple"
          icon={<Icon as={FaDollarSign} boxSize={5} />}
          cursor={"pointer"}
          onClick={onOpen}
          {...rest}
        />
      </Tooltip>
      <AddExpense isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddExpenseButton;
