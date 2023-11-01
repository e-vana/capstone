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
import { EditTeamComponent } from "./types";
import { useEffect, useState } from "react";
import { iTeam } from "../../interfaces/teams.interface";
import { editTeam } from "../../api/teams.api";

const EditTeam: EditTeamComponent = ({ team, isOpen, onClose }) => {
    const [name, setName] = useState<string>(team?.name || "");

    const orgId = team?.organization_id || -1;

    useEffect(() => {
        setName(team?.name || "");
    }, [team, isOpen]);

    const toast = useToast();
    const queryClient = useQueryClient();

    const handleEdit = () => {
        const data: Pick<iTeam, "name"> = {
            name: name,
        };
        mutation.mutate(data);
        cleanUp();
    };

    const mutation = useMutation({
        mutationFn: (
            data: Pick<iTeam, "name">
        ) => {
            return editTeam(orgId, team?.id, data);
        },
        onSuccess: () => {
            toast({
                status: "success",
                title: "Edited team successfully.",
            });
            queryClient.invalidateQueries({ queryKey: "getTeam" });
            queryClient.invalidateQueries({ queryKey: "getTeams" });
            queryClient.invalidateQueries({ queryKey: "getEvents" });
            queryClient.invalidateQueries({ queryKey: "getOrganizations" });
            mutation.reset();
        },
        onError: (err: Error) => {
            toast({
                status: "error",
                title: "Error editing team, please try again.",
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
                <ModalHeader>Edit Team - {team?.name}</ModalHeader>
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
                            onClick={handleEdit}
                        >
                            Edit <Icon as={AiOutlineCheckCircle} />
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditTeam;
