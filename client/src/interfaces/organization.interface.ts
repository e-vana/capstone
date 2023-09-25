export interface iOrganization {
  id: number;
  owner_user_id: number;
  name: string;
  website_url: string;
  phone_number: string;
  logo_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface iGetOrganizations {
  success: boolean;
  organizations: iOrganization[];
}

export interface iGetOrganization {
  success: boolean;
  organization: iOrganization;
}
