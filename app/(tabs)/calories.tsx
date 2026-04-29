import { ScrollView, View } from "react-native";
import React, { useState } from "react";

import { BurnHero } from "@/components/frontend/burn/Burn-Hero";
import { QuickActionCard } from "@/components/frontend/burn/Quick-Action-Card";
import { TodayActivityCard } from "@/components/frontend/burn/Today-Acticity-Card";
import { CaloriesPieChart } from "@/components/frontend/burn/calorie-pie";

import { useLiveTracking } from "@/hooks/use-Live-Tracking";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LiveSessionCard } from "@/components/frontend/burn/Live-session-card";
import { TrackingControls } from "@/components/frontend/burn/Tracking-controls";
import { useToast } from "@/providers/toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTest } from "@/store/caloriesSlice";

const CaloriesScreen = () => {
  const user = useQuery(api.test.getUser);
  if (!user) console.log("user is undefined");
  const goal = 40;

  const {
    calories,
    distance,
    duration,
    isTracking,
    start,
    pause,
    resume,
    stop,
    reset,
  } = useLiveTracking("running", user?.weight ?? 70);

  const mutation = useMutation(api.burn.addActivity);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const testValue = useSelector((state: RootState) => state.calories.test);

  const dispatch = useDispatch();
  dispatch(setTest("redux is ok"));

  // use the VALUE (string)
  showToast(testValue);

  const data = useQuery(api.burn.getTodaysActivity, {});

  const dbCalories = data?.totalCalories ?? 0;

  const liveCalories = isTracking ? calories : 0;

  const totalBurned = dbCalories + (isTracking ? calories : 0);
  const isGoalReached = totalBurned >= goal;

  const handleStop = async () => {
    const result = stop();

    if (!result) return;

    try {
      setLoading(true);

      await mutation({
        type: "running",
        duration: result.duration,
        distance: result.distance,
        avgSpeed: result.avgSpeed,
      });
      reset();
    } catch (err) {
      console.log("Save failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black px-2 pt-10">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,

          paddingBottom: 100,
          gap: 16,
        }}
      >
        <BurnHero
          liveBurned={liveCalories}
          totalBurned={totalBurned}
          goal={goal}
          isGoalReached={isGoalReached}
        />

        <LiveSessionCard
          duration={duration}
          distance={distance}
          calories={calories}
        />

        <TrackingControls
          isTracking={isTracking}
          loading={loading}
          onStart={start}
          onPause={pause}
          onResume={resume}
          onStop={handleStop}
        />

        <QuickActionCard />
        <TodayActivityCard />

        <CaloriesPieChart
          data={[
            { label: "Running", burned: 240, color: "#eb4d4b" },
            { label: "Walking", burned: 80, color: "#8e44ad" },
            { label: "Cycling", burned: 120, color: "#2ecc71" },
            { label: "Gym", burned: 50, color: "#3498db" },
          ]}
        />
      </ScrollView>
    </View>
  );
};

export default CaloriesScreen;
