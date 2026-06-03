import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";

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
import { useDispatch } from "react-redux";
import { setGoalReached } from "@/store/caloriesSlice";
import { GoalCelebration } from "@/components/frontend/animation/Goal-Celebration";

const CaloriesScreen = () => {
  const user = useQuery(api.test.getuserDetails);
  const goal = 10;

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

  const addCalDB = useMutation(api.burn.addActivity);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const data = useQuery(api.burn.getToadysCalories, {});
  console.log(data);
  const activityData = useQuery(api.burn.getTodaysActivity);
  console.log(activityData);

  const isActivityLoading = activityData === undefined;

  // 🔥 GROUP + AGGREGATE
  const grouped = activityData?.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = {
          duration: 0,
          calories: 0,
        };
      }

      acc[item.type].duration += item.duration;
      acc[item.type].calories += item.calories;

      return acc;
    },
    {} as Record<string, { duration: number; calories: number }>,
  );

  // 🔥 FORMAT FOR UI
  const formattedActivities = Object.entries(grouped || {}).map(
    ([type, value]) => ({
      type: type as "walking" | "running" | "cycling" | "gym",
      duration: `${Math.round(value.duration / 60)} min`,
      burned: Math.round(value.calories).toString(),
    }),
  );

  // 🔥 PIE CHART DATA
  const pieData = Object.entries(grouped || {}).map(([type, value]) => ({
    label: type,
    burned: Math.round(value.calories),
    color:
      type === "running"
        ? "#eb4d4b"
        : type === "walking"
          ? "#8e44ad"
          : type === "cycling"
            ? "#2ecc71"
            : "#3498db",
  }));

  const dbCalories = data?.totalCalories ?? 0;
  const liveCalories = isTracking ? calories : 0;
  const totalBurned = dbCalories + liveCalories;
  const isGoalReached = totalBurned >= goal;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGoalReached(isGoalReached));
  }, [isGoalReached, dispatch]);

  const handleStop = async () => {
    const result = stop();
    if (!result) return;

    try {
      setLoading(true);

      await addCalDB({
        type: "running",
        duration: result.duration,
        distance: result.distance,
        avgSpeed: result.avgSpeed,
        calories: result.calories,
      });

      showToast("activity added", "success");
      reset();
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black px-2 pt-10">
      <GoalCelebration />

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

        {/* 🔥 TODAY ACTIVITY */}
        <TodayActivityCard
          data={formattedActivities}
          onMenuPress={(type) => {
            console.log("Clicked:", type);
            // 👉 navigate or open modal here
          }}
        />

        {/* 🔥 PIE CHART */}
        <CaloriesPieChart data={pieData} />
      </ScrollView>
    </View>
  );
};

export default CaloriesScreen;
