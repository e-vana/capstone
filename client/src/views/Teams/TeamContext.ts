import { createContext } from "react";
import { iTeamContext } from "./types";
import { FAKE_MEMBERS } from "../Organizations/OrganizationPage";

const TeamContext = createContext<iTeamContext>({
  teamData: undefined,
  teamLoading: false,
  members: FAKE_MEMBERS,
});

export { TeamContext };
