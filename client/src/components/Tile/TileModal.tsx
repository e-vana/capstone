import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { TileModalComponent } from "./types";

const TileModal: TileModalComponent = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent
        bg={useColorModeValue("purple.500", "purple.400")}
        color={"white"}
      >
        <ModalCloseButton onClick={onClose} />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TileModal;
