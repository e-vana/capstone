import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/user.interface";

interface iInitialState {
  user: Omit<iUser, "password"> | undefined;
  joinURL: string | undefined;
}

const initialState: iInitialState = {
  user: undefined,
  joinURL: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<iUser, "password">>) => {
      state.user = action.payload;
    },
    addEventToJoin: (state, action: PayloadAction<string>) => {
      state.joinURL = action.payload;
    },
    clearJoinURL: (state) => {
      state.joinURL = undefined;
    },
  },
});

export const { setUser, addEventToJoin, clearJoinURL } = userSlice.actions;
export default userSlice.reducer;
