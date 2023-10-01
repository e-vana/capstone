export interface iExpenseJoinEventJoinTeamJoinOrgJoinUser {
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  expense_name: string;
  expense_type: string;
  amount: number;
  description: string;
  receipt_url: string;
  organization_name: string;
  team_name: string;
  event_name: string;
  event_description: string;
  event_start_time: Date;
  event_end_time: Date;
}
export interface iGetExpensesByEventResponse {
  success: boolean;
  expenses: iExpenseJoinEventJoinTeamJoinOrgJoinUser[];
}
export interface iGetExpensesByTeamResponse {
  success: boolean;
  expenses: iExpenseJoinEventJoinTeamJoinOrgJoinUser[];
}
export interface iGetExpensesByOrganizationResponse {
  success: boolean;
  expenses: iExpenseJoinEventJoinTeamJoinOrgJoinUser[];
}

export interface iCreateExpenseResponse {
  success: boolean;
}
export interface iCreateExpense {
  expense_name: string;
  expense_type: string;
  amount: number;
  description: string;
  receipt_url: string;
}
