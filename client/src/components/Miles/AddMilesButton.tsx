import {
  Tooltip,
  IconButton,
  Icon,
  useDisclosure,
  IconButtonProps,
} from "@chakra-ui/react";
import { LiaCarSideSolid } from "react-icons/lia";
import AddMiles from "./AddMiles";
import { FunctionComponent } from "react";

const AddMilesButton: FunctionComponent<IconButtonProps> = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label="add miles">
        <IconButton
          icon={<Icon as={LiaCarSideSolid} boxSize={5} />}
          variant={"ghost"}
          colorScheme="purple"
          cursor={"pointer"}
          onClick={onOpen}
          {...rest}
        />
      </Tooltip>
      <AddMiles isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddMilesButton;
