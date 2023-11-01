import { FunctionComponent } from "react";
import { iEventJoinOrg } from "../../interfaces/events.interface";
import { iOrganization } from "../../interfaces/organization.interface";
import { iTeam } from "../../interfaces/teams.interface";

interface EditOrgProps {
  org: iOrganization;
  isOpen: boolean;
  onClose: () => void;
}

interface EditTeamProps {
  team: iTeam;
  isOpen: boolean;
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
