import { Flex, Stack, Text } from "@chakra-ui/react";
import { OrgFilter } from "./EventFilters";
import { EventsComponent } from "./types";
import EventList from "./EventList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useQuery } from "react-query";
import { getEventsInATeam } from "../../api/events.api";
import { setEvents } from "../../features/Organizations/organizationSlice";

const Events: EventsComponent = () => {};

export default Events;
