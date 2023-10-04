import { ChangeEvent, FunctionComponent, ReactNode } from "react";
import { iTeam } from "../../interfaces/teams.interface";
import { CardProps, TableContainerProps } from "@chakra-ui/react";
import { iEvent } from "../../interfaces/events.interface";

export interface iEventContext {
  eventData: iEvent | undefined;
  eventLoading: boolean;
}

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

interface EventHeaderProps {
  children: ReactNode;
}

interface EventTasksProps {
  orgId: number;
  eventId: number;
}

export type OrgFilterComponent = FunctionComponent<OrgFilterProps>;
export type TeamFilterComponent = FunctionComponent<TeamFilterProps>;
export type EventsComponent = FunctionComponent<EventsProps>;
export type EventsListComponent = FunctionComponent<EventListProps>;
export type EventTableComponent = FunctionComponent<EventTableProps>;
export type EventCardsComponent = FunctionComponent<EventCardsProps>;
export type EventHeaderComponent = FunctionComponent<EventHeaderProps>;
export type EventTasksComponent = FunctionComponent<EventTasksProps>;
