import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface calorieState {
  isGoalReached: boolean;
  test: string;
}

const initialState: calorieState = {
  isGoalReached: false,
  test: "this is redux",
};

const caloriesSlice = createSlice({
  name: "calories",
  initialState,
  reducers: {
    setGoalReached: (state, action: PayloadAction<boolean>) => {
      state.isGoalReached = action.payload;
    },
    setTest: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
    },
  },
});
export const { setGoalReached, setTest } = caloriesSlice.actions;
export default caloriesSlice.reducer;
