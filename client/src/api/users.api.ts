import axios from "axios";

interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

interface GetUsersResponse {
  users: User[];
}

export const getUsers = async function (): Promise<GetUsersResponse> {
  let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
  return response.data as GetUsersResponse;
};
