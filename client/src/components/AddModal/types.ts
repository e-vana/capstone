import { FunctionComponent } from "react";

interface AddOrgProps {
  isOpen: boolean;
  // refetchOrganizations: () => void;
  // refetchTeams: () => void;
  // refetchEvents: () => void;
  onClose: () => void;
}

interface AddTeamProps {
  isOpen: boolean;
  orgId: number;
  orgName: string;
  // refetchEvents: () => void;
  // refetchTeams: () => void;
  onClose: () => void;
}

export type AddOrgComponent = FunctionComponent<AddOrgProps>;
export type AddTeamComponent = FunctionComponent<AddTeamProps>;
