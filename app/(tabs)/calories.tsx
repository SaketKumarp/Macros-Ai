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
  const user = useQuery(api.test.getUser);
  if (!user) console.log("user is undefined");
  const goal = 35;

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

  //TODO: change the ui on completing the goal

  const data = useQuery(api.burn.getTodaysActivity, {});

  const dbCalories = data?.totalCalories ?? 0;

  const liveCalories = isTracking ? calories : 0;

  const totalBurned = dbCalories + (isTracking ? calories : 0);
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

        // so the calories that are live is a bit different from what i am saving in db
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
      {/* <Image source={require("../../assets/images/newLazy.png")} /> */}
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
