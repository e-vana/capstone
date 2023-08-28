import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iCounterState {
  value: number;
}

const initialState: iCounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, addByAmount } = counterSlice.actions;
export default counterSlice.reducer;
