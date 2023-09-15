import { FunctionComponent } from "react";

interface AddOrgProps {
  isOpen: boolean;
  onClose: () => void;
}

export type AddOrgComponent = FunctionComponent<AddOrgProps>;
