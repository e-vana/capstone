import { createContext } from "react";
import { iEventContext } from "./types";

const EventContext = createContext<iEventContext>({
  eventData: undefined,
  eventLoading: true,
});

export default EventContext;
