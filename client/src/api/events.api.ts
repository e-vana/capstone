import axios from "axios";
import { iGetEvent, iGetEvents } from "../interfaces/events.interface";

// GET EVENTS IN A ORG
export const getEvents = async function (orgId: number): Promise<iGetEvents> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetEvents>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// CREATE AN EVENT IN A ORG

// GET A SINGLE EVENT IN A ORG
export const getEventInAnOrg = async function (
  orgId: number,
  eventId: number
): Promise<iGetEvent> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetEvent>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// GET A SINGLE EVENT IN A TEAM
export const getEventInATeam = async function (
  orgId: number,
  teamId: number,
  eventId: number
): Promise<iGetEvent> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetEvent>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// GET EVENTS IN A TEAM
export const getEventsInATeam = async function (
  orgId: number,
  teamId: number
): Promise<iGetEvents> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetEvents>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
