export interface iHoursJoinEventJoinTeamJoinOrgJoinUser {
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  start_time: Date;
  end_time: Date;
  organization_name: string;
  team_name: string;
  event_name: string;
  event_description: string;
  event_start_time: Date;
  event_end_time: Date;
}

export interface iGetHoursByEventResponse {
  success: boolean;
  hours: iHoursJoinEventJoinTeamJoinOrgJoinUser[];
}
export interface iGetHoursByTeamResponse {
  success: boolean;
  hours: iHoursJoinEventJoinTeamJoinOrgJoinUser[];
}
export interface iGetHoursByOrganizationResponse {
  success: boolean;
  hours: iHoursJoinEventJoinTeamJoinOrgJoinUser[];
}

export interface iCreateHoursResponse {
  success: boolean;
}
export interface iCreateHours {
  start_time: Date;
  end_time?: Date;
}
