import { FunctionComponent } from "react";
import { iOrganization } from "../../interfaces/organization.interface";
import { BoxProps } from "@chakra-ui/react";

interface OrganizationsProps {
  organizations: iOrganization[];
}

interface OrganizationItemProps extends BoxProps {
  organization: iOrganization;
}

export type OrganizationsComponent = FunctionComponent<OrganizationsProps>;
export type OrganizationItemComponent =
  FunctionComponent<OrganizationItemProps>;
