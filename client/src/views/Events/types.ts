import { ChangeEvent, FunctionComponent } from "react";
import { iTeam } from "../../interfaces/teams.interface";
import { CardProps, TableContainerProps } from "@chakra-ui/react";

interface OrgFilterProps {}

interface TeamFilterProps {
  teamData: iTeam[];
  onTeamChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

interface EventsProps {
  onOrgChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onTeamChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

interface EventListProps {}

interface EventTableProps extends TableContainerProps {}

interface EventCardsProps extends CardProps {}

export type OrgFilterComponent = FunctionComponent<OrgFilterProps>;
export type TeamFilterComponent = FunctionComponent<TeamFilterProps>;
export type EventsComponent = FunctionComponent<EventsProps>;
export type EventsListComponent = FunctionComponent<EventListProps>;
export type EventTableComponent = FunctionComponent<EventTableProps>;
export type EventCardsComponent = FunctionComponent<EventCardsProps>;
