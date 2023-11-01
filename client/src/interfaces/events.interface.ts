export interface iEvent {
  id: number;
  team_id: number;
  created_by_user_id: number;
  name: string;
  description: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zipcode: string; // Zipcodes can be in the format of 12345 or 12345-6789
  start_time: Date;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface iEventJoinOrg {
  team_id: number;
  team_name: string;
  event_id: number;
  event_name: string;
  event_description: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  organization_name: string;
  organization_id: number;
  created_by_user_id?: number;
  start_time: Date;
  end_time: Date;
}

export interface iEventJoinTeamJoinOrg {
  team_id: number;
  team_name: string;
  event_id: number;
  event_name: string;
  event_description: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zipcode: number;
  organization_name: string;
  organization_id: number;
}

export interface iGetEvents {
  success: boolean;
  events: iEvent[];
}

export interface iGetEventsByOrg {
  success: boolean;
  events: iEventJoinOrg[];
}

export interface iGetEventsJoinTeamJoinOrg {
  success: boolean;
  events: iEventJoinTeamJoinOrg[];
}

export interface iCreateEventInATeam {
  success: boolean;
  event_id: number;
}

export interface iUpdateEventInATeam {
  success: boolean;
  event_id: number;
}

export interface iDeleteEventInATeam {
  success: boolean;
  event_id: number;
}
