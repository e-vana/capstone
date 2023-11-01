import { FunctionComponent } from "react";
import { iEventJoinOrg } from "../../interfaces/events.interface";

interface EditOrgProps {
  isOpen: boolean;
  orgId: number;
  onClose: () => void;
}

interface EditTeamProps {
  isOpen: boolean;
  orgId: number;
  teamId: number;
  orgName: string;
  onClose: () => void;
}

interface EditEventProps {
  isOpen: boolean;
  event: iEventJoinOrg;
  onClose: () => void;
}

interface DeleteEventProps {
  isOpen: boolean;
  event: iEventJoinOrg;
  onClose: () => void;
}

export type EditOrgComponent = FunctionComponent<EditOrgProps>;
export type EditTeamComponent = FunctionComponent<EditTeamProps>;
export type EditEventComponent = FunctionComponent<EditEventProps>;
export type DeleteEventComponent = FunctionComponent<DeleteEventProps>;
