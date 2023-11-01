import { Dispatch, FunctionComponent, ReactNode, SetStateAction } from "react";

export interface iOrgFormData {
  orgID: number;
  teamID: number | undefined;
  eventID: number | undefined;
}

export interface iDetails {
  name: string;
  description: string;
  type: string;
  url: string;
}

interface AddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AmountFormProps {
  children: ReactNode;
}

interface OrgFormProps {
  data: iOrgFormData;
  setData: Dispatch<SetStateAction<iOrgFormData>>;
}

interface DetailsFormProps {
  details: iDetails;
  setDetails: Dispatch<SetStateAction<iDetails>>;
}

export type AddExpenseComponent = FunctionComponent<AddExpenseProps>;
export type AmountFormComponent = FunctionComponent<AmountFormProps>;
export type OrgFormComponent = FunctionComponent<OrgFormProps>;
export type DetailsFormComponent = FunctionComponent<DetailsFormProps>;
