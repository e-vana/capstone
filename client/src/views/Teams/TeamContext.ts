import { createContext } from "react";
import { iTeamContext } from "./types";

const TeamContext = createContext<iTeamContext>({
  teamData: undefined,
  teamLoading: false,
});

export { TeamContext };
