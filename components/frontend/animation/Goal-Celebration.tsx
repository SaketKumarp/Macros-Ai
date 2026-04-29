import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const GoalCelebration = () => {
  const isGoalReached = useSelector(
    (state: RootState) => state.calories.isGoalReached,
  );
  console.log(isGoalReached);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isGoalReached) {
      setShow(true);

      // auto hide after animation
      setTimeout(() => setShow(false), 3000);
    }
  }, [isGoalReached]);

  if (!show) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../../../assets/animation/Success celebration.json")} // 🔥 download from lottiefiles
        autoPlay
        loop={false}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 999, // 🔥 Android fix
    pointerEvents: "none", // allows touch through
  },
});
