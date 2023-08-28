import axios from "axios";
import { iGetUsersResponse } from "../interfaces/user.interface";

export const getUsers = async function (): Promise<iGetUsersResponse> {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
  return response.data as iGetUsersResponse;
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
