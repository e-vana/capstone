import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { DeleteEventComponent } from './types';
import { useMutation, useQueryClient } from 'react-query';
import { deleteATeamEvent } from '../../api/events.api';

const DeleteEventAlert: DeleteEventComponent = ({ isOpen, onClose, event }) => {
    const cancelRef = React.useRef(null);
    const toast = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleDelete = () => {
        const data: { eventId: number, orgId: number, teamId: number } = {
            eventId: event.event_id,
            orgId: event.organization_id,
            teamId: event.team_id,
        };

        mutation.mutate(data);
        cleanUp();
    };

    const mutation = useMutation({
        mutationFn: (
            data: { eventId: number, orgId: number, teamId: number }
        ) => {
            return deleteATeamEvent(data);
        },
        onSuccess: () => {
            toast({
                status: "success",
                title: "Deleted event successfully",
            });
            queryClient.invalidateQueries({ queryKey: "getEvents" });
            mutation.reset();
            onClose();
            // Navigate to the events page
            navigate("/d/" + event.organization_id);
        },
        onError: (err: Error) => {
            toast({
                status: "error",
                title: "Error deleting the event, please try again.",
                description: err.message,
            });
            mutation.reset();
        }
    });

    // Restore original state and close the modal
    function cleanUp(): void {
        onClose();
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Event - {event?.event_name}
                        <AlertDialogCloseButton />
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

    )
};

export default DeleteEventAlert;
