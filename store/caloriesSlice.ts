import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface calorieState {
  isGoalReached: boolean;
  
}

const initialState: calorieState = {
  isGoalReached: false,

};

const caloriesSlice = createSlice({
  name: "calories",
  initialState,
  reducers: {
    setGoalReached: (state, action: PayloadAction<boolean>) => {
      state.isGoalReached = action.payload;
    },
    
  },
});
export const { setGoalReached } = caloriesSlice.actions;
export default caloriesSlice.reducer;
