import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { AddOrgComponent } from "./types";
import { useState } from "react";
import { iOrganization } from "../../interfaces/organization.interface";
import { addOrganization } from "../../api/organizations.api";

const AddOrg: AddOrgComponent = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [logo, setLogo] = useState<string>("");

  const toast = useToast();
  const queryClient = useQueryClient();

  const handleAdd = () => {
    const data: Pick<
      iOrganization,
      "name" | "website_url" | "logo_url" | "phone_number"
    > = {
      name: name,
      website_url: website,
      logo_url: logo,
      phone_number: phoneNumber,
    };
    mutation.mutate(data);
    cleanUp();
  };

  const mutation = useMutation(
    (
      data: Pick<
        iOrganization,
        "name" | "website_url" | "logo_url" | "phone_number"
      >
    ) => {
      return addOrganization(data);
    }
  );

  function cleanUp(): void {
    onClose();
    setName("");
    setWebsite("");
    setPhoneNumber("");
    setLogo("");
  }

  if (mutation.isSuccess) {
    toast({
      status: "success",
      title: "Added Organization!",
    });
    mutation.reset();
    queryClient.invalidateQueries(["getOrganizations"]);
    queryClient.invalidateQueries(["getTeams"]);
    queryClient.invalidateQueries(["getEvents"]);
  }

  if (mutation.isError) {
    toast({
      status: "error",
      title: "Could not add org, try again later.",
    });
    mutation.reset();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "full", md: "lg" }}
      variant={"outline"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Add Organization</ModalHeader>
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              data-testid="addOrgModalName"
              type={"text"}
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Website</FormLabel>
            <Input
              data-testid="addOrgModalWebsite"
              type={"url"}
              placeholder="www.example.com"
              value={website}
              onChange={(e) => setWebsite(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Logo</FormLabel>
            {/* Change this with bucket upload */}
            <Input type={"file"} onChange={() => setLogo("")} />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              data-testid="addOrgModalPhone"
              type={"tel"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.currentTarget.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack
            width={{ base: "100%", md: "50%" }}
            justifyContent={"space-between"}
          >
            <Button
              colorScheme="gray"
              width={"100%"}
              justifyContent={"space-between"}
              variant={"outline"}
              onClick={onClose}
            >
              Cancel <Icon as={AiOutlineClose} />
            </Button>
            <Button
              data-testid="addOrgModalSubmit"
              colorScheme="purple"
              justifyContent={"space-between"}
              width={"100%"}
              onClick={handleAdd}
            >
              Add <Icon as={AiOutlineCheckCircle} />
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOrg;
