import { ScrollView, View } from "react-native";
import React, { useState } from "react";

import { BurnHero } from "@/components/frontend/burn/Burn-Hero";
import { QuickActionCard } from "@/components/frontend/burn/Quick-Action-Card";
import { TodayActivityCard } from "@/components/frontend/burn/Today-Acticity-Card";
import { CaloriesPieChart } from "@/components/frontend/burn/calorie-pie";

import { useLiveTracking } from "@/hooks/use-Live-Tracking";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LiveSessionCard } from "@/components/frontend/burn/Live-session-card";
import { TrackingControls } from "@/components/frontend/burn/Tracking-controls";

const CaloriesScreen = () => {
  const goal = 700;
  const weight = 80;

  const {
    calories,
    distance,
    duration,
    isTracking,
    start,
    pause,
    resume,
    stop,
  } = useLiveTracking("running", weight);

  const mutation = useMutation(api.burn.addActivity);
  const [loading, setLoading] = useState(false);
  const [sessionCal, setSessioncal] = useState<number>(0);
  let totalcal = 0;

  const handleStop = async () => {
    const result = stop();
    totalcal += result.calories;
    setSessioncal(totalcal);
    if (!result) return;

    try {
      setLoading(true);

      await mutation({
        type: "running",
        duration: result.duration,
        distance: result.distance,
        avgSpeed: result.avgSpeed,
      });
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
          paddingTop: 16,
          paddingBottom: 100,
          gap: 16,
        }}
      >
        <BurnHero burned={sessionCal} goal={goal} />

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
