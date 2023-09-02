import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/user.interface";

interface iInitialState {
  user: Omit<iUser, "password"> | undefined;
}

const initialState: iInitialState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<iUser, "password">>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
