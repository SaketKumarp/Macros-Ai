import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const useGetTodayMeals = () => {
  const data = useQuery(api.macros.getTodayMeals);

  const mealLoading = data === undefined;
  const meals = data ?? [];

  return {
    meals,
    mealLoading,
    isEmpty: !mealLoading && meals.length === 0, // 🔥 bonus
  };
};
