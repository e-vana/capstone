import axios from "axios";
import {
  iGetEvents,
  iGetEventsJoinTeamJoinOrg,
  iEventJoinOrg,
} from "../interfaces/events.interface";

// GET EVENTS IN AN ORG
export const getEventsInAnOrg = async function (
  orgId: number
): Promise<iEventJoinOrg> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iEventJoinOrg>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
// GET A SINGLE EVENT IN A ORG
export const getEventInAnOrg = async function (
  orgId: number,
  eventId: number
): Promise<iEventJoinOrg> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iEventJoinOrg>(
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
): Promise<iGetEvents> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetEvents>(
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
export const getEventsInAnOrganization = async function (
  orgId: number
): Promise<iGetEventsJoinTeamJoinOrg> {
  const response = await axios.get<iGetEventsJoinTeamJoinOrg>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/events`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
export const getAnEventInAnOrganization = async function (
  orgId: number,
  eventId: number
): Promise<iGetEventsJoinTeamJoinOrg> {
  const response = await axios.get<iGetEventsJoinTeamJoinOrg>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/events/${eventId}`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
