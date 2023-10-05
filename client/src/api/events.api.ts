import axios from "axios";
import {
  iEvent,
  iGetEvent,
  iGetEvents,
  iGetEventsJoinTeamJoinOrg,
  iCreateEventInATeam
} from "../interfaces/events.interface";

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

// Create an event within a team
export const createEventInATeam = async function (
  data: Omit<iEvent, "created_by_user_id" | "event_id" | "organization_name" | "team_name" | "created_at" | "updated_at">,
): Promise<iCreateEventInATeam> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.post<iCreateEventInATeam>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${data.organization_id}/teams/${data.team_id}/events`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

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

export const getEventsInAnOrganization = async function (
  orgId: number
): Promise<iGetEventsJoinTeamJoinOrg> {
  const response = await axios.get<iGetEventsJoinTeamJoinOrg>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/events`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
