import axios from "axios";
import { iGetTasks, iGetTask, iTask } from "../interfaces/tasks.interface";
import { iUser } from "../interfaces/user.interface";

// GET ALL TASKS IN EVENT
export async function getTasks(
  orgId: number,
  eventId: number
): Promise<iGetTasks> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token found, please log in");
  const response = await axios.get<iGetTasks>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/events/${eventId}/tasks`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

// GET TASK BY ID
export async function getTask(
  orgId: number,
  eventId: number,
  taskId: number
): Promise<iGetTask> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token found, please log in");
  const response = await axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/events/${eventId}/tasks/${taskId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

// CREATE A TASK WITHIN ORG AND EVENT
export async function addTask(
  orgId: number,
  eventId: number,
  data: Pick<iTask, "name" | "description">
): Promise<{
  success: boolean;
  insertId: number;
}> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.post(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/events/${eventId}/tasks`,
    data,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

// MARK A TASK COMPLETE - COMPLETE: 0 | 1
export async function completeTask(
  orgId: number,
  eventId: number,
  taskId: number,
  completed: number
) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token found, please log in");
  const payload = { completed };
  const response = await axios.post(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/events/${eventId}/tasks/${taskId}`,
    payload,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
}
