import { configureStore } from "@reduxjs/toolkit";

import caloriesReducer from "./caloriesSlice";

export const store = configureStore({
  reducer: {
    calories: caloriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
