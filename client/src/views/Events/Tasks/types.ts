import { FunctionComponent } from "react";
import { iTask } from "../../../interfaces/tasks.interface";

interface TaskListProps {
  tasks: iTask[];
  isLoading: boolean;
}

interface TaskCardProps {
  task: iTask;
}

interface AddTaskPopoverProps {
  handleAddTask: (s: string) => void;
}

interface TaskBodyProps {
  task: iTask;
  eventName: string;
}

export type TaskListComponent = FunctionComponent<TaskListProps>;
export type TaskCardComponent = FunctionComponent<TaskCardProps>;
export type AddTaskPopoverComponent = FunctionComponent<AddTaskPopoverProps>;
export type TaskBodyComponent = FunctionComponent<TaskBodyProps>;
