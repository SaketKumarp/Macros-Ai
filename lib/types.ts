import { Id } from "@/convex/_generated/dataModel";

// export type meal = Id<"foods">;

export interface Meal {
  _id: string;
  _creationTime: number;

  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  type: string;

  image?: string;
  userId: string;

  date: string;
  createdAt: number;
}
