import { createContext } from "react";
import { iOrgContext } from "./types";

const OrganizationContext = createContext<iOrgContext>({
  orgData: undefined,
  teamsData: undefined,
  eventsData: undefined,
  members: undefined,
  orgLoading: true,
  teamsLoading: true,
  eventsLoading: true,
  membersLoading: true,
});

export default OrganizationContext;
