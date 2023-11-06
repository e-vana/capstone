import { Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getEventInAnOrg } from "../../api/events.api";
import { addTask, getTasks } from "../../api/tasks.api";
import { iTask } from "../../interfaces/tasks.interface";
import EventContext from "./EventContext";
import EventHeader from "./EventHeader";
import TaskList from "./Tasks/TaskList";
import AddTaskPopover from "./Tasks/AddTaskPopover";

const EventPage = () => {
  const { organizationId, eventId } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("getEvent", () =>
    getEventInAnOrg(+organizationId!, +eventId!)
  );

  const { data: tasksData, isLoading: tasksLoading } = useQuery(
    "getTasks",
    () => getTasks(+organizationId!, +eventId!)
  );

  const addTaskMutation = useMutation(
    (data: {
      orgId: number;
      eventId: number;
      taskData: Pick<iTask, "name" | "description">;
    }) => addTask(data.orgId, data.eventId, data.taskData)
  );

  const handleAddTask = (taskName: string) => {
    console.log({ submitted: taskName });
    if (!organizationId || !eventId) return;
    addTaskMutation.mutate({
      orgId: +organizationId,
      eventId: +eventId,
      taskData: {
        name: taskName,
        description: "",
      },
    });
  };

  if (addTaskMutation.isSuccess) {
    toast({
      status: "success",
      title: "Task added successfully.",
    });
    addTaskMutation.reset();
    queryClient.invalidateQueries("getTasks");
  }

  if (addTaskMutation.status === "error") {
    toast({
      status: "error",
      title: "There was an error adding the task, please try again.",
    });
    addTaskMutation.reset();
    console.log(addTaskMutation.error);
  }

  return (
    <Stack flex={1} height={"100%"}>
      <EventContext.Provider
        value={{
          eventData: data?.event,
          eventLoading: isLoading,
        }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={"start"}
          p={5}
        >
          <Stack>
            <Heading size={"md"}>Event Name:</Heading>
            <EventHeader>{data?.event.event_name}</EventHeader>
          </Stack>
          <Stack>
            <Heading size={"sm"} alignItems={"center"} height={"100%"}>
              Tasks: <AddTaskPopover handleAddTask={handleAddTask} />
            </Heading>
            {tasksData !== undefined ? (
              <TaskList tasks={tasksData.tasks} isLoading={tasksLoading} />
            ) : (
              <Text>No tasks for this event yet!</Text>
            )}
          </Stack>
        </Stack>
      </EventContext.Provider>
    </Stack>
  );
};

export default EventPage;
