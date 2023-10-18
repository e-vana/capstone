import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iOrganization } from "../../interfaces/organization.interface";
import { iTeam } from "../../interfaces/teams.interface";
import { iEvent, iEventJoinOrg } from "../../interfaces/events.interface";
import Organizations from "../../views/Organizations/Organizations";

interface iInitialState {
  organizations: iOrganization[];
  selectedOrg: number;
  selectedTeam: number;
  teams: iTeam[];
  events: iEventJoinOrg[]; 
}

const initialState: iInitialState = {
  organizations: [],
  selectedOrg: 1,
  selectedTeam: 0,
  teams: [],
  events: [],
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrgs: (state, action: PayloadAction<iOrganization[]>) => {
      state.organizations = action.payload;
    },
    setOrg: (state, action: PayloadAction<number>) => {
      state.selectedOrg = action.payload;
    },
    setTeams: (state, action: PayloadAction<iTeam[]>) => {
      state.teams = action.payload;
    },
    setTeam: (state, action: PayloadAction<number>) => {
      state.selectedTeam = action.payload;
    },
    setEvents: (state, action: PayloadAction<iEvent[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setOrgs, setOrg, setTeams, setTeam, setEvents } =
  organizationSlice.actions;
export default organizationSlice.reducer;
