import { FunctionComponent } from "react";

interface AddOrgProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AddTeamProps {
  isOpen: boolean;
  orgId: number;
  orgName: string;
  onClose: () => void;
}

interface AddEventProps {
  isOpen: boolean;
  orgId: number;
  orgName: string;
  teamId: number;
  teamName: string;
  onClose: () => void;
}

export type AddOrgComponent = FunctionComponent<AddOrgProps>;
export type AddTeamComponent = FunctionComponent<AddTeamProps>;
export type AddEventComponent = FunctionComponent<AddEventProps>;
