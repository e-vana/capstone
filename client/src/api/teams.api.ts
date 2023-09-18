import axios from "axios";
import { iTeam, iGetTeams } from "../interfaces/teams.interface";

export const getTeams = async function (orgId: number): Promise<iGetTeams> {
  const response = await axios.get<iGetTeams>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/teams`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const addTeam = async function (
  data: Pick<iTeam, "name" | "organization_id">
): Promise<iTeam> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found in teams.api@addTeam. Please login and try again.");
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/organizations/${data.organization_id}/teams`,
    data,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};
