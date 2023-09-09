import axios from "axios";
import { iGetOrganizations } from "../interfaces/organization.interface";

export const getOrganizations = async function (): Promise<iGetOrganizations> {
  const response = await axios.get<iGetOrganizations>(
    `${import.meta.env.VITE_BASE_URL}/organizations`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
