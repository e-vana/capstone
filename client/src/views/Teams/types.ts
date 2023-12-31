import { FunctionComponent } from "react";
import { iTeam } from "../../interfaces/teams.interface";

export interface iTeamContext {
  teamData: iTeam | undefined;
  teamLoading: boolean;
  members: {
    name: string;
  }[];
}

interface TeamHeaderProps {
  children: React.ReactNode;
}
export type TeamHeaderComponent = FunctionComponent<TeamHeaderProps>;
