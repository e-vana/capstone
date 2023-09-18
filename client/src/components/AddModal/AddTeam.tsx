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
import { AddTeamComponent } from "./types";
import { useState } from "react";
import { iTeam } from "../../interfaces/teams.interface";
import { addTeam } from "../../api/teams.api";

const AddTeam: AddTeamComponent = ({ orgId, orgName, isOpen, onClose }) => {
  const [name, setName] = useState<string>("");

  const toast = useToast();
  const queryClient = useQueryClient();

  const handleAdd = () => {
    const data: Pick<iTeam, "name" | "organization_id"> = {
      name: name,
      organization_id: orgId,
    };
    mutation.mutate(data);
    cleanUp();
  };

  const mutation = useMutation({
    mutationFn: (
      data: Pick<iTeam, "name" | "organization_id">
    ) => {
      return addTeam(data);
    },
    onSuccess: () => {
      toast({
        status: "success",
        title: "Added Team!",
      });
      console.log("Trying to refetch since we added a team")
      // queryClient.invalidateQueries([
      //   "getOrganizations",
      //   "getEvents",
      //   "getTeams",
      // ]);
      queryClient.invalidateQueries({ queryKey: "getTeams" });
      queryClient.invalidateQueries({ queryKey: "getOrganizations" });
      queryClient.invalidateQueries({ queryKey: "getEvents" });
      // For some reason I couldn't get invalidateQueries to work with the array syntax,
      // and also wasn't having success invalidating the getTeams query. Passing the refetch
      // functions in via props from the parent component works, but I'm not sure if that's ideal.
      // refetchEvents();
      // refetchOrganizations();
      // refetchTeams();
      mutation.reset();
    },
    onError: (err: Error) => {
      toast({
        status: "error",
        title: "Error adding team",
        description: err.message,
      });
    }
  });

  function cleanUp(): void {
    setName("");
    onClose();
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
        <ModalHeader>Add Team to {orgName}</ModalHeader>
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Team Name</FormLabel>
            <Input
              type={"text"}
              value={name}
              min={1}
              max={100}
              placeholder={"Team Name"}
              pattern={"[A-Za-z0-9]{1,100}"}
              onChange={(e) => setName(e.target.value)}
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

export default AddTeam;
