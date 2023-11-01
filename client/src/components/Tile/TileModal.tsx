import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { TileModalComponent } from "./types";

const TileModal: TileModalComponent = ({
  isOpen,
  onClose,
  children,
  ...rest
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "full", md: "lg" }}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        bg={useColorModeValue("white", "#151515")}
        color={useColorModeValue("#303030", "whiteAlpha.900")}
      >
        <ModalCloseButton onClick={onClose} />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TileModal;
