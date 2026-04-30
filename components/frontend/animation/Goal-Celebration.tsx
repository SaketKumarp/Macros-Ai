import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// ✅ preload animation (better performance)
const successAnim = require("../../../assets/animation/Success celebration.json");

export const GoalCelebration = () => {
  const isGoalReached = useSelector(
    (state: RootState) => state.calories.isGoalReached,
  );

  const [show, setShow] = useState(false);
  const prev = useRef(false);

  // ✅ smooth opacity animation
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // trigger only once when goal becomes true
    if (!prev.current && isGoalReached) {
      setShow(true);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }

    prev.current = isGoalReached;
  }, [isGoalReached, opacity]);

  const handleFinish = () => {
    // fade out smoothly
    Animated.timing(opacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShow(false);
    });
  };

  if (!show) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <LottieView
        source={successAnim}
        autoPlay
        loop={false}
        onAnimationFinish={handleFinish}
        style={{ width: "100%", height: "100%" }}
      />
    </Animated.View>
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
    elevation: 999, // Android support
    pointerEvents: "none", // allow touches through
  },
});
