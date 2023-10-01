import axios from "axios";

import {
  iCreateHours,
  iCreateHoursResponse,
  iGetHoursByEventResponse,
  iGetHoursByOrganizationResponse,
  iGetHoursByTeamResponse,
} from "../interfaces/hours.interface";

// GET HOURS FOR A PARTICULAR EVENT
export const getHoursForAnEvent = async function (
  orgId: number,
  teamId: number,
  eventId: number
): Promise<iGetHoursByEventResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetHoursByEventResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events/${eventId}/hours`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// GET MILES FOR A PARTICULAR TEAM
export const getHoursForATeam = async function (
  orgId: number,
  teamId: number
): Promise<iGetHoursByTeamResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetHoursByTeamResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/hours`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
// GET MILES FOR A PARTICULAR ORGANIZATION
export const getExpensesForAnOrganization = async function (
  orgId: number
): Promise<iGetHoursByOrganizationResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetHoursByOrganizationResponse>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/hours`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// CREATE HOURS FOR AN EVENT
export const createMilesForAnEvent = async function (
  orgId: number,
  teamId: number,
  eventId: number,
  hours: iCreateHours
): Promise<iCreateHoursResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.post<iCreateHoursResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events/${eventId}/hours`,
    hours,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
