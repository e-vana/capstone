import axios from "axios";
import {
  iGetEvents,
  iGetEventsJoinTeamJoinOrg,
} from "../interfaces/events.interface";

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

export const getEventsInATeam = async function (
  orgId: number,
  teamId: number
): Promise<iGetEvents> {
  const response = await axios.get<iGetEvents>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
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
