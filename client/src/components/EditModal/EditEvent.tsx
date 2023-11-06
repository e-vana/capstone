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
    useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { EditEventComponent } from "./types";
import DeleteEventAlert from "./DeleteEvent";
import { useEffect, useState } from "react";
import { updateATeamEvent } from "../../api/events.api";
import { iEventJoinOrg } from "../../interfaces/events.interface";

const EditEventModal: EditEventComponent = ({ isOpen, onClose, event }) => {
    const [name, setName] = useState<string>(event?.event_name || event?.name || "");
    const [description, setDescription] = useState<string>(event?.event_description || event?.description || "");
    const [startDateTime, setStartDateTime] = useState<string>(new Date(event?.start_time || "1970-01-01T00:00:00")?.toISOString().slice(0, 16));
    const [endDateTime, setEndDateTime] = useState<string>(new Date(event?.end_time || "1970-01-01T00:00:00")?.toISOString().slice(0, 16));
    const [addressStreet, setAddressStreet] = useState<string>(event?.address_street || "");
    const [addressCity, setAddressCity] = useState<string>(event?.address_city || "");
    const [addressState, setAddressState] = useState<string>(event?.address_state || "");
    const [addressZip, setAddressZip] = useState<string>(event?.address_zipcode || "");

    // On props 'event' change, update the state so the modal has the new values
    useEffect(() => {
        setName(event?.event_name || event?.name || "");
        setDescription(event?.event_description || event?.description || "");
        setStartDateTime(new Date(event?.start_time || "1970-01-01T00:00:00")?.toISOString().slice(0, 16));
        setEndDateTime(new Date(event?.end_time || "1970-01-01T00:00:00")?.toISOString().slice(0, 16));
        setAddressStreet(event?.address_street || "");
        setAddressCity(event?.address_city || "");
        setAddressState(event?.address_state || "");
        setAddressZip(event?.address_zipcode || "");
    }, [event]);

    const toast = useToast();
    const queryClient = useQueryClient();
    const { isOpen: isDeleteEventOpen, onOpen: onOpenDeleteEvent, onClose: onCloseDeleteEvent } = useDisclosure();

    const handleUpdate = () => {
        const data: Omit<iEventJoinOrg, "created_by_user_id" | "organization_name" | "team_name" | "created_at" | "updated_at"> = {
            event_id: event.event_id,
            event_name: name,
            event_description: description,
            organization_id: event.organization_id,
            team_id: event.team_id,
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
            data: Omit<iEventJoinOrg, "created_by_user_id" | "organization_name" | "team_name" | "created_at" | "updated_at">
        ) => {
            return updateATeamEvent(data);
        },
        onSuccess: () => {
            toast({
                status: "success",
                title: "Updated event successfully",
            });
            queryClient.invalidateQueries({ queryKey: "getEvent" });
            queryClient.invalidateQueries({ queryKey: "getEvents" });
            queryClient.invalidateQueries({ queryKey: "getEventsByTeam" });
            mutation.reset();
            cleanUp()
        },
        onError: (err: Error) => {
            toast({
                status: "error",
                title: "Error updating the event, please try again.",
                description: err.message,
            });
            mutation.reset();
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
                <ModalHeader>Edit Event Details - {event?.event_name || event?.name}</ModalHeader>
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
                            placeholder={"Event Address - Ctiy"}
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
                    <HStack width={{ base: "100%", md: "50%" }} justifyContent={"flex-start"}>
                        <Button colorScheme="red" width={"35%"} onClick={onOpenDeleteEvent}>
                            Delete <Icon as={AiOutlineClose} />
                        </Button>
                    </HStack>
                    <HStack width={{ base: "100%", md: "50%" }} justifyContent={"flex-end"}>
                        <Button
                            colorScheme="gray"
                            width={"100%"}
                            variant={"outline"}
                            onClick={onClose}
                        >
                            Cancel <Icon as={AiOutlineClose} />
                        </Button>
                        <Button
                            colorScheme="purple"
                            justifyContent={"space-between"}
                            width={"100%"}
                            onClick={handleUpdate}
                        >
                            Update <Icon as={AiOutlineCheckCircle} />
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
            <DeleteEventAlert isOpen={isDeleteEventOpen} onClose={onCloseDeleteEvent} event={event} />
        </Modal>
    );
};

export default EditEventModal;
