import { RefObject, useRef, useState } from "react";
import {
  Text,
  FocusLock,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddTaskPopoverComponent } from "./types";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const Form = ({
  onClose,
  ref,
  handleAddTask,
}: {
  onClose: () => void;
  ref: RefObject<HTMLInputElement>;
  handleAddTask: (s: string) => void;
}) => {
  const [taskName, setTaskName] = useState<string>("");
  const textColor = useColorModeValue("#303030", "whiteAlpha.800");
  return (
    <Stack padding={3} gap={3}>
      <FormControl>
        <FormLabel fontSize={"sm"}>Task Name:</FormLabel>
        <Input
          ref={ref}
          type={"text"}
          placeholder="Enter a name for this task..."
          fontSize={"sm"}
          size={"md"}
          value={taskName}
          onChange={(e) => setTaskName(e.currentTarget.value)}
        />
        <Text
          my={2}
          fontSize={"2xs"}
          color={taskName.length < 40 ? textColor : "red.400"}
        >
          Total Characters {taskName.length} / {40}
        </Text>
      </FormControl>
      <HStack>
        <Button
          size={"sm"}
          alignSelf={"end"}
          colorScheme="purple"
          onClick={() => {
            handleAddTask(taskName);
            onClose();
          }}
        >
          Add Task
        </Button>
        <Icon as={CloseIcon} boxSize={3} onClick={onClose} cursor={"pointer"} />
      </HStack>
    </Stack>
  );
};

const AddTaskPopover: AddTaskPopoverComponent = ({ handleAddTask }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const firstFieldRef = useRef(null);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      placement="right"
      closeOnBlur={false}
      initialFocusRef={firstFieldRef}
    >
      <PopoverTrigger>
        <IconButton aria-label="add-task" icon={<AddIcon />} size={"xs"} />
      </PopoverTrigger>
      <PopoverContent bg={useColorModeValue("white", "#202020")}>
        <FocusLock restoreFocus persistentFocus={false}>
          <PopoverArrow bg={useColorModeValue("white", "#202020")} />
          <Form
            onClose={onClose}
            ref={firstFieldRef}
            handleAddTask={handleAddTask}
          />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default AddTaskPopover;
