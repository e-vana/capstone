import axios from "axios";
import { iGetUsersResponse, iUser } from "../interfaces/user.interface";

export const getUsers = async function (): Promise<iGetUsersResponse> {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
  return response.data as iGetUsersResponse;
};

export const loginUser = async function (
  loginData: Pick<iUser, "email" | "password">
): Promise<string> {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    loginData
  );
  localStorage.setItem("token", response.data.jwt);
  return response.data;
};

export const registerUser = async function (
  newUser: Omit<iUser, "id" | "created_at" | "updated_at">
): Promise<string> {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/register`,
    newUser
  );
  localStorage.setItem("token", response.data.jwt);
  return response.data;
};

export const getUser = async function (): Promise<Omit<iUser, "password">> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in again");
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.data);
  return response.data.data;
};

// wait wrapper for testing loading states
export const waitWrapper =
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callBack: () => Promise<any>,
    delay: number = 2000
  ) =>
  async () => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return callBack();
  };
