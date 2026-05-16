import { Id } from "@/convex/_generated/dataModel";

const activityLevel = 1.56;

type UserDetail =
  | {
      _id: Id<"users">;
      _creationTime: number;
      height?: number;
      goal?: string;
      userId: string;
      name: string;
      weight: number;
      age: number;
    }
  | null
  | undefined;

export const calculateCalories = (user: UserDetail) => {
  // loading or missing user
  if (!user) {
    return {
      maintenance: 0,
      calorieGoal: 0,
    };
  }

  // optional field safety
  if (!user.height || !user.goal) {
    return {
      maintenance: 0,
      calorieGoal: 0,
    };
  }

  const bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;

  const maintenance = Math.round(bmr * activityLevel);

  let calorieGoal = maintenance;

  if (user.goal === "Cut") {
    calorieGoal = maintenance - 400;
  }

  if (user.goal === "Bulk") {
    calorieGoal = maintenance + 300;
  }

  return {
    maintenance,
    calorieGoal,
  };
};
