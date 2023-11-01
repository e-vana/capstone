import axios from "axios";
import { iTeam, iGetTeams, iGetTeam } from "../interfaces/teams.interface";

// GET TEAMS IN A ORG
export const getTeams = async function (
  orgId: number | undefined
): Promise<iGetTeams> {
  const token = localStorage.getItem("token");
  if (!token)
    throw new Error(
      "No token found in teams.api@getTeams. Please log in and try again."
    );

  if (orgId == undefined) {
    return { success: true, teams: [] };
  }

  const response = await axios.get<iGetTeams>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/teams`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ADDS TEAM TO ORG
export const addTeam = async function (
  data: Pick<iTeam, "name" | "organization_id">
): Promise<iTeam> {
  const token = localStorage.getItem("token");
  if (!token)
    throw new Error(
      "No token found in teams.api@addTeam. Please login and try again."
    );
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/organizations/${
      data.organization_id
    }/teams`,
    data,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};

// GET A TEAM IN AN ORG
export const getTeam = async function (
  orgId: number,
  teamId: number
): Promise<iGetTeam> {
  const token = localStorage.getItem("token");
  if (!token)
    throw new Error(
      "No token found in teams.api@getTeam. Please login and try again"
    );
  const response = await axios.get<iGetTeam>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/teams/${teamId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
