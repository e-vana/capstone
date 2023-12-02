import { FunctionComponent } from "react";
import { iMilesJoinEventJoinTeamJoinOrgJoinUser } from "../../interfaces/miles.interface";
import { StackProps } from "@chakra-ui/react";

interface MilesTotalProps extends StackProps {
  children: React.ReactNode;
}

interface MilesTableProps {
  miles: iMilesJoinEventJoinTeamJoinOrgJoinUser[] | undefined;
}

interface MilesTableRowProps {
  miles: iMilesJoinEventJoinTeamJoinOrgJoinUser;
}

interface MilesCardsProps {
  miles: iMilesJoinEventJoinTeamJoinOrgJoinUser[] | undefined;
}

interface MilesCardProps {
  mileage: iMilesJoinEventJoinTeamJoinOrgJoinUser;
}

export type MilesTableComponent = FunctionComponent<MilesTableProps>;
export type MilesTableRowComponent = FunctionComponent<MilesTableRowProps>;
export type MilesCardsComponent = FunctionComponent<MilesCardsProps>;
export type MilesCardComponent = FunctionComponent<MilesCardProps>;
export type MilesTotalComponent = FunctionComponent<MilesTotalProps>;
