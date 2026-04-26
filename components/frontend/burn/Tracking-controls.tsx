import { View, Text, Pressable } from "react-native";
import React from "react";

interface Props {
  isTracking: boolean;
  loading: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export const TrackingControls = ({
  isTracking,
  loading,
  onStart,
  onPause,
  onResume,
  onStop,
}: Props) => {
  return (
    <View className="flex-row gap-3 justify-center">
      {!isTracking ? (
        <Pressable
          onPress={onStart}
          className="bg-orange-500 px-6 py-3 rounded-full"
          style={{
            shadowColor: "#f97316",
            shadowOpacity: 0.4,
            shadowRadius: 10,
          }}
        >
          <Text className="text-black font-bold">Start</Text>
        </Pressable>
      ) : (
        <>
          <Pressable
            onPress={onPause}
            className="bg-[#18181b] px-5 py-3 rounded-full border border-[#27272a]"
          >
            <Text className="text-white font-semibold">Pause</Text>
          </Pressable>

          <Pressable
            onPress={onResume}
            className="bg-[#18181b] px-5 py-3 rounded-full border border-[#27272a]"
          >
            <Text className="text-white font-semibold">Resume</Text>
          </Pressable>

          <Pressable
            onPress={onStop}
            disabled={loading}
            className="bg-red-500 px-5 py-3 rounded-full"
          >
            <Text className="text-white font-bold">
              {loading ? "Saving..." : "Stop"}
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};
