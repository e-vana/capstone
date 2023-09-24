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

export type AddOrgComponent = FunctionComponent<AddOrgProps>;
export type AddTeamComponent = FunctionComponent<AddTeamProps>;
