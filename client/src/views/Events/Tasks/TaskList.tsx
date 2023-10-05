import { SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import { TaskListComponent } from "./types";
import TaskCard from "./TaskCard";

const TaskList: TaskListComponent = ({ tasks, isLoading }) => {
  return (
    <Stack>
      {isLoading ? (
        <SimpleGrid columns={1} gap={5}>
          {[1, 2, 3].map((index) => (
            <Skeleton
              key={"TaskGridIdx" + index}
              width={"400px"}
              height={"60px"}
              isLoaded={isLoading}
            />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={1} gap={3}>
          {tasks && tasks.map((task) => <TaskCard key={"TaskGridId" + task.id} task={task} />)}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default TaskList;
