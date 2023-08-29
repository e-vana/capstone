export interface iUser {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface iGetUsersResponse {
  users: iUser[];
}
