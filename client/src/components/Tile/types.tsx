import { FunctionComponent } from "react";
import { iOrganization } from "../../interfaces/organization.interface";
import { iEventJoinOrg } from "../../interfaces/events.interface";

interface TileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface UserTileProps {}

interface EventTileProps {
  event: iEventJoinOrg;
  eventURL: string;
}

interface OrganizationTileProps {
  organization: iOrganization;
}

export type TileModalComponent = FunctionComponent<TileModalProps>;
export type UserTileComponent = FunctionComponent<UserTileProps>;
export type EventTileComponent = FunctionComponent<EventTileProps>;
export type OrganizationTileComponent =
  FunctionComponent<OrganizationTileProps>;
