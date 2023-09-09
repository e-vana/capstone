import axios from "axios";
import { iGetEvents } from "../interfaces/events.interface";

export const getEvents = async function (orgId: number): Promise<iGetEvents> {
  const response = await axios.get<iGetEvents>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/events`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
