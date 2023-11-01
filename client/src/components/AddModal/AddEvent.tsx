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
import { AddEventComponent } from "./types";
import { useState } from "react";
import { createEventInATeam } from "../../api/events.api";
import { iEventJoinOrg } from "../../interfaces/events.interface";


// TODO: We currently get the target org and team from props but maybe we should get them from the redux store?
// To avoid having to pass them down from the parent component in various places.
const AddEvent: AddEventComponent = ({ orgId, orgName, teamId, teamName = "", isOpen, onClose }) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDateTime, setStartDateTime] = useState<string>("1970-01-01T00:00:00");
    const [endDateTime, setEndDateTime] = useState<string>("1970-01-01T00:00:00");
    const [addressStreet, setAddressStreet] = useState<string>("");
    const [addressCity, setAddressCity] = useState<string>("");
    const [addressState, setAddressState] = useState<string>("");
    const [addressZip, setAddressZip] = useState<string>("");

    const toast = useToast();
    const queryClient = useQueryClient();

    const handleAdd = () => {
        const data: Omit<iEventJoinOrg, "created_by_user_id" | "event_id" | "organization_name" | "team_name" | "created_at" | "updated_at"> = {
            event_name: name,
            event_description: description,
            organization_id: orgId,
            team_id: teamId,
            start_time: new Date(startDateTime),
            end_time: new Date(endDateTime),
            address_street: addressStreet,
            address_city: addressCity,
            address_state: addressState,
            address_zipcode: addressZip,
        };
        mutation.mutate(data);
        cleanUp();
    };

    const mutation = useMutation({
        mutationFn: (
            data: Omit<iEventJoinOrg, "created_by_user_id" | "event_id" | "organization_name" | "team_name" | "created_at" | "updated_at">
        ) => {
            return createEventInATeam(data);
        },
        onSuccess: () => {
            toast({
                status: "success",
                title: "Added event successfully.",
            });
            queryClient.invalidateQueries({ queryKey: "getEvents" });
            mutation.reset();
        },
        onError: (err: Error) => {
            toast({
                status: "error",
                title: "Error adding the event, please try again.",
                description: err.message,
            });
        }
    });

    // Restore original state and close the modal
    function cleanUp(): void {
        setName("");
        setDescription("");
        setStartDateTime("1970-01-01T00:00:00");
        setEndDateTime("1970-01-01T00:00:00");
        setAddressStreet("");
        setAddressCity("");
        setAddressState("");
        setAddressZip("");
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size={{ base: "full", md: "lg" }}
            variant={"outline"}
            closeOnOverlayClick={false}
            closeOnEsc={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Add Event to {teamName ?
                    `${orgName} - ${teamName}` : orgName}</ModalHeader>
                <ModalBody>
                    {/* TODO: Add form validation and error messages */}
                    <FormControl isRequired>
                        <FormLabel>Event Name</FormLabel>
                        <Input
                            type={"text"}
                            value={name}
                            min={1}
                            max={150}
                            placeholder={"Event Name"}
                            pattern={encodeURIComponent("[A-Za-z0-9!.,-]{1,150}")}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Event Description</FormLabel>
                        <Input
                            type={"text"}
                            value={description}
                            min={1}
                            max={65535} // mysql TEXT field upper limit: 65,535 characters
                            placeholder={"Event Description"}
                            pattern={encodeURIComponent("[A-Za-z0-9!.,-]{1,65535}")}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <strong>Event Address</strong>
                    <FormControl isRequired>
                        <FormLabel>Street</FormLabel>
                        <Input
                            type={"text"}
                            value={addressStreet}
                            min={1}
                            max={100}
                            placeholder={"Event Address - Street"}
                            pattern={encodeURIComponent("[A-Za-z0-9.,-]{1,100}")}
                            onChange={(e) => setAddressStreet(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                            type={"text"}
                            value={addressCity}
                            min={1}
                            max={100}
                            placeholder={"Event Address - City"}
                            pattern={encodeURIComponent("[A-Za-z.,-]{1,100}")}
                            onChange={(e) => setAddressCity(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>State</FormLabel>
                        <Input
                            type={"text"}
                            value={addressState}
                            min={1}
                            max={100}
                            placeholder={"Event Address - State"}
                            pattern={encodeURIComponent("[A-Za-z.,-]{1,100}")}
                            onChange={(e) => setAddressState(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Zip Code</FormLabel>
                        <Input
                            type={"text"}
                            value={addressZip}
                            min={1}
                            max={100}
                            placeholder={"Event Address - Zip Code"}
                            pattern={encodeURIComponent("[0-9-]{1,100}")}
                            onChange={(e) => setAddressZip(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Start Date & Time</FormLabel>
                        <Input
                            type={"datetime-local"}
                            value={startDateTime}
                            placeholder={"Event Start Date"}
                            onChange={(e) => setStartDateTime(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>End Date & Time</FormLabel>
                        <Input
                            type={"datetime-local"}
                            value={endDateTime}
                            placeholder={"Event End Date"}
                            onChange={(e) => setEndDateTime(e.target.value)}
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

export default AddEvent;
