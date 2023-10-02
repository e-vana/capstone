import { useState } from "react";
import {
  Stack,
  Icon,
  Heading,
  Text,
  Textarea,
  Box,
  Button,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { BsCardText, BsWindowDock } from "react-icons/bs";
import { TaskBodyComponent } from "./types";
import { useContext } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { formatDate } from "../../../hooks/formatDate";
import EventContext from "../EventContext";

const TaskBody: TaskBodyComponent = ({ task }) => {
  const { eventData } = useContext(EventContext);
  const [descActivated, setDescActivated] = useState<boolean>(false);
  const bgColor = useColorModeValue("gray.50", "#303030");
  const bgHover = useColorModeValue("gray.300", "whiteAlpha.300");
  return (
    <Stack width={"100%"} spacing={5}>
      <Stack direction={"row"} height={"100%"} align={"start"}>
        <Icon as={BsWindowDock} boxSize={5} />

        <Stack px={3}>
          <Heading size={"md"}>{task.name}</Heading>
          <Text>
            In event:{" "}
            <Text as={"span"} textDecor={"underline"}>
              {eventData?.event_name}
            </Text>
          </Text>
        </Stack>
      </Stack>
      <Stack direction={"row"} width={"100%"}>
        <Icon as={BsCardText} boxSize={5} />
        <Stack px={3} width={"100%"}>
          <Heading size={"md"}>Description</Heading>
          {task.description !== "" ? (
            <Text>{task.description}</Text>
          ) : descActivated ? (
            <Stack>
              <Textarea
                width={"100%"}
                placeholder="Add a more detailed description..."
                bg={bgHover}
              />
              <HStack gap={5}>
                <Button colorScheme="purple" width={"fit-content"}>
                  Save
                </Button>
                <CloseIcon
                  boxSize={3}
                  cursor={"pointer"}
                  onClick={() => setDescActivated(false)}
                />
              </HStack>
            </Stack>
          ) : (
            <Box
              width="100%"
              height={"80px"}
              cursor={"pointer"}
              transition={".3s ease-in-out"}
              bg={bgColor}
              p={3}
              rounded={"md"}
              _hover={{
                bg: bgHover,
              }}
              onClick={() => setDescActivated(true)}
            >
              <Text>Add a more detailed description...</Text>
            </Box>
          )}
          {task.completed_at && (
            <Text fontSize={"xs"} fontStyle={"italic"} mt={8}>
              Completed at: {formatDate(new Date(task.completed_at))}
            </Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TaskBody;
