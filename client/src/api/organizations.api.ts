import axios from "axios";
import {
  iGetOrganization,
  iGetOrganizations,
  iOrganization,
} from "../interfaces/organization.interface";

export const getOrganizations = async function (): Promise<iGetOrganizations> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
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

// only gets orgs that a user owns -- as per endpoint
export const getOrganization = async function (
  organizationId: number
): Promise<iOrganization> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetOrganization>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${organizationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.organization;
};

export const addOrganization = async function (
  data: Pick<
    iOrganization,
    "name" | "website_url" | "logo_url" | "phone_number"
  >
): Promise<iOrganization> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("non token, please log in");
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/organizations`,
    data,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};
