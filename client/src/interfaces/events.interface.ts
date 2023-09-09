export interface iEvent {
  id: number;
  organization_id: number;
  created_by_user_id: number;
  name: string;
  description: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  start_time: Date;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface iGetEvents {
  success: boolean;
  events: iEvent[];
}
