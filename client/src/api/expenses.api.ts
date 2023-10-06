import axios from "axios";
import {
  iCreateExpense,
  iCreateExpenseResponse,
  iGetExpensesByEventResponse,
  iGetExpensesByOrganizationResponse,
  iGetExpensesByTeamResponse,
} from "../interfaces/expenses.interface";

// GET EXPENSES FOR A PARTICULAR EVENT
export const getExpensesForAnEvent = async function (
  orgId: number,
  teamId: number,
  eventId: number
): Promise<iGetExpensesByEventResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetExpensesByEventResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events/${eventId}/expenses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// GET EXPENSES FOR A PARTICULAR TEAM
export const getExpensesForATeam = async function (
  orgId: number,
  teamId: number
): Promise<iGetExpensesByTeamResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetExpensesByTeamResponse>(
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
// GET EXPENSES FOR A PARTICULAR ORGANIZATION
export const getExpensesForAnOrganization = async function (
  orgId: number
): Promise<iGetExpensesByOrganizationResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.get<iGetExpensesByOrganizationResponse>(
    `${import.meta.env.VITE_BASE_URL}/organizations/${orgId}/expenses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// CREATE AN EXPENSE FOR AN EVENT
export const createExpenseForAnEvent = async function (
  orgId: number,
  teamId: number,
  eventId: number,
  expense: iCreateExpense
): Promise<iCreateExpenseResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token, please log in");
  const response = await axios.post<iCreateExpenseResponse>(
    `${
      import.meta.env.VITE_BASE_URL
    }/organizations/${orgId}/teams/${teamId}/events/${eventId}/expenses`,
    expense,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};