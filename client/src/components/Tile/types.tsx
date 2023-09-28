import { FunctionComponent } from "react";
import { iOrganization } from "../../interfaces/organization.interface";

interface TileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface UserTileProps {}

interface OrganizationTileProps {
  organization: iOrganization;
}

export type TileModalComponent = FunctionComponent<TileModalProps>;
export type UserTileComponent = FunctionComponent<UserTileProps>;
export type OrganizationTileComponent =
  FunctionComponent<OrganizationTileProps>;
