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
import { EditOrgComponent } from "./types";
import { useEffect, useState } from "react";
import { iOrganization } from "../../interfaces/organization.interface";
import { editOrganization } from "../../api/organizations.api";

const EditOrgModal: EditOrgComponent = ({ org, isOpen, onClose }) => {
    const [name, setName] = useState<string>(org?.name || "");
    const [website, setWebsite] = useState<string>(org?.website_url || "");
    const [phoneNumber, setPhoneNumber] = useState<string>(org?.phone_number || "");
    const [logo, setLogo] = useState<string>(org?.logo_url || "");

    // When we close and reopen the modal, or change the target org., we want to reset the form
    useEffect(() => {
        setName(org?.name || "");
        setWebsite(org?.website_url || "");
        setPhoneNumber(org?.phone_number || "");
        setLogo(org?.logo_url || "");
    }, [org]);

    const toast = useToast();
    const queryClient = useQueryClient();

    const handleEdit = () => {
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

    const mutation = useMutation({
        mutationFn: (
            data: Pick<
                iOrganization,
                "name" | "website_url" | "logo_url" | "phone_number"
            >
        ) => {
            return editOrganization(org.id, data);
        },
        onSuccess: () => {
            toast({
                title: "Organization edited successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            queryClient.invalidateQueries("getOrganization");
            queryClient.invalidateQueries("getOrganizations");
            queryClient.invalidateQueries("getTeams");
            queryClient.invalidateQueries("getEvents");
            mutation.reset();
            cleanUp();
        },
        onError: (err: Error) => {
            toast({
                title: "Error editing organization. Please try again.",
                description: err.message,
                status: "error",
            });
            mutation.reset();
        }
    });

    function cleanUp(): void {
        setName("");
        setWebsite("");
        setPhoneNumber("");
        setLogo("");
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
                <ModalHeader>Edit Organization</ModalHeader>
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            data-testid="editOrgModalName"
                            type={"text"}
                            value={name}
                            min={1}
                            max={100}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Website</FormLabel>
                        <Input
                            data-testid="editOrgModalWebsite"
                            type={"url"}
                            placeholder="www.example.com"
                            value={website}
                            min={1}
                            max={150}
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
                            data-testid="editOrgModalPhone"
                            type={"tel"}
                            value={phoneNumber}
                            min={1}
                            max={150}
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
                            data-testid="editOrgModalSubmit"
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

export default EditOrgModal;
