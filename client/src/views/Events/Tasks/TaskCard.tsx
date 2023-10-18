import { useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Icon,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TaskCardComponent } from "./types";
import { ChevronRightIcon } from "@chakra-ui/icons";
import TaskBody from "./TaskBody";
import { useMutation, useQueryClient } from "react-query";
import { completeTask } from "../../../api/tasks.api";
import EventContext from "../EventContext";

const TaskCard: TaskCardComponent = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { eventData } = useContext(EventContext);
  const queryClient = useQueryClient();
  const completedMap: { [key: number]: boolean } = {
    0: false,
    1: true,
  };
  const toast = useToast();

  const mutation = useMutation(
    (data: {
      orgId: number;
      eventId: number;
      taskId: number;
      completed: number;
    }) => completeTask(data.orgId, data.eventId, data.taskId, data.completed)
  );

  const handleComplete = (status: number) => {
    if (eventData !== undefined) {
      switch (status) {
        case 0:
          mutation.mutate({
            orgId: eventData.organization_id,
            eventId: eventData.event_id,
            taskId: task.id,
            completed: 1,
          });
          toast({
            status: "success",
            title: "Task Completed!",
          });
          break;
        case 1:
          mutation.mutate({
            orgId: eventData.organization_id,
            eventId: eventData.event_id,
            taskId: task.id,
            completed: 0,
          });
          break;
      }
    }
    return;
  };

  if (mutation.isSuccess) {
    mutation.reset();
    queryClient.invalidateQueries("getTasks");
  }

  if (mutation.status === "error") {
    toast({
      status: "error",
      title: "Error completing task",
    });
    mutation.reset();
  }

  return (
    <>
      <Card
        key={"EventTaskId" + task.id}
        height={"100%"}
        direction={"row"}
        align={"center"}
        bg={useColorModeValue("white", "#404040")}
        boxShadow={useColorModeValue("base", "none")}
      >
        <CardHeader height={"100%"} alignItems={"center"} display={"flex"}>
          <Checkbox
            colorScheme="purple"
            isChecked={completedMap[task.completed]}
            onChange={() => handleComplete(task.completed)}
          />
        </CardHeader>
        <CardBody>
          <Stack>
            <Heading
              size={"sm"}
              textDecorationLine={task.completed ? "line-through" : "none"}
            >
              {task.name}
            </Heading>
          </Stack>
        </CardBody>
        <CardFooter
          onClick={onOpen}
          _hover={{
            bg: useColorModeValue("gray.300", "blackAlpha.300"),
          }}
          height={"100%"}
          alignItems={"center"}
          borderLeftWidth={"1px"}
          borderLeftColor={useColorModeValue(
            "blackAlpha.300",
            "whiteAlpha.300"
          )}
          transition={".3s ease-in-out"}
          cursor={"pointer"}
          roundedRight={"md"}
        >
          <Icon as={ChevronRightIcon} />
        </CardFooter>
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "full", md: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent
          p={5}
          width={"100%"}
          bg={useColorModeValue("white", "#202020")}
          rounded={"lg"}
        >
          <ModalCloseButton />
          <ModalBody width={"100%"}>
            <TaskBody task={task} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskCard;
