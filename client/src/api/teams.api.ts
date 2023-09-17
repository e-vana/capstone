import axios from "axios";
import { iGetTeams } from "../interfaces/teams.interface";

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
