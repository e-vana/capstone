import axios from "axios";
import {
  iCreateMiles,
  iCreateMilesResponse,
  iGetMilesByEventResponse,
  iGetMilesByOrganizationResponse,
  iGetMilesByTeamResponse,
  iGetMilesByUser,
  iGetUserMileageBreakdown,
  iMilesJoinEventJoinTeamJoinOrgJoinUser,
} from "../interfaces/miles.interface";

// GET MILES FOR A PARTICULAR EVENT
export const getMilesForAnEvent = async function (
  orgId: number,
  teamId: number,
  eventId: number
): Promise<iGetMilesByEventResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetMilesByEventResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events/${eventId}/miles`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// GET MILES FOR A PARTICULAR TEAM
export const getMilesForATeam = async function (
  orgId: number,
  teamId: number
): Promise<iGetMilesByTeamResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetMilesByTeamResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/expenses`,
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
): Promise<iGetMilesByOrganizationResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetMilesByOrganizationResponse>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/expenses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// CREATE MILES FOR AN EVENT
export const createMilesForAnEvent = async function (
  orgId: number,
  teamId: number,
  eventId: number,
  miles: iCreateMiles
): Promise<iCreateMilesResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.post<iCreateMilesResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events/${eventId}/miles`,
    miles,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserMiles = async function (): Promise<iGetMilesByUser> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetMilesByUser>(
    `${import.meta.env.VITE_BASE_URL}/auth/my-miles`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// GET USER MILES
export const getUserMileageBreakdown =
  async function (): Promise<iGetUserMileageBreakdown> {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("no token, please log in");
    const response = await axios.get<iGetUserMileageBreakdown>(
      `${import.meta.env.VITE_BASE_URL}/auth/my-miles-breakdown`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };
