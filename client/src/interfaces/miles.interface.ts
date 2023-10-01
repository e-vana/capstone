export interface iMilesJoinEventJoinTeamJoinOrgJoinUser {
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  mileage: number;
  date_traveled: Date;
  organization_name: string;
  team_name: string;
  event_name: string;
  event_description: string;
  event_start_time: Date;
  event_end_time: Date;
}

export interface iGetMilesByEventResponse {
  success: boolean;
  miles: iMilesJoinEventJoinTeamJoinOrgJoinUser[];
}
export interface iGetMilesByTeamResponse {
  success: boolean;
  miles: iMilesJoinEventJoinTeamJoinOrgJoinUser[];
}
export interface iGetMilesByOrganizationResponse {
  success: boolean;
  miles: iMilesJoinEventJoinTeamJoinOrgJoinUser[];
}

export interface iCreateMilesResponse {
  success: boolean;
}
export interface iCreateMiles {
  mileage: number;
  date_traveled: Date;
}
