export interface iTeam {
  id: number;
  organization_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface iGetTeams {
  success: boolean;
  teams: iTeam[];
}
