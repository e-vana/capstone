import { FunctionComponent } from "react";
import { iOrganization } from "../../interfaces/organization.interface";
import { BoxProps } from "@chakra-ui/react";
import { iGetTeams } from "../../interfaces/teams.interface";
import { iGetEvents } from "../../interfaces/events.interface";

// for now
export interface iMember {
  name: string;
}

export interface iOrgContext {
  orgData: iOrganization | undefined;
  teamsData: iGetTeams | undefined;
  eventsData: iGetEvents | undefined;
  members: iMember[] | undefined;
  orgLoading: boolean;
  teamsLoading: boolean;
  eventsLoading: boolean;
  membersLoading: boolean;
}

interface OrganizationsProps {
  organizations: iOrganization[];
}

interface OrganizationItemProps extends BoxProps {
  organization: iOrganization;
}

interface OrganizationContainerProps {
  children: React.ReactNode;
}

interface OrganizationHeaderProps {
  children: React.ReactNode;
}

export type OrganizationsComponent = FunctionComponent<OrganizationsProps>;
export type OrganizationItemComponent =
  FunctionComponent<OrganizationItemProps>;
export type OrganizationContainerComponent =
  FunctionComponent<OrganizationContainerProps>;
export type OrganizationHeaderComponent =
  FunctionComponent<OrganizationHeaderProps>;
