import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { getDistance } from "@/lib/utils";

type ActivityType = "walking" | "running";

const MET = {
  walking: 3.5,
  running: 8,
};

export const useLiveTracking = (type: ActivityType, weight: number) => {
  const [distance, setDistance] = useState(0); // meters
  const [duration, setDuration] = useState(0); // seconds
  const [calories, setCalories] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  const prevLocation = useRef<Location.LocationObjectCoords | null>(null);
  const timer = useRef<number | null>(null);
  const locationSub = useRef<Location.LocationSubscription | null>(null);

  // 🔁 Shared tracking logic (used by start + resume)
  const startTracking = async () => {
    // ⏱️ timer
    timer.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);

    // 📍 GPS tracking
    locationSub.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 2,
      },
      (loc) => {
        const current = loc.coords;

        if (prevLocation.current) {
          const d = getDistance(prevLocation.current, current);

          // 🔥 better noise filtering
          if (d > 2 && d < 30) {
            setDistance((prev) => prev + d);
          }
        }

        prevLocation.current = current;
      },
    );
  };

  // ▶️ START
  const start = async () => {
    if (isTracking) return;

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    setIsTracking(true);
    await startTracking();
  };

  // ⏸️ PAUSE
  const pause = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }

    if (locationSub.current) {
      locationSub.current.remove();
      locationSub.current = null;
    }

    setIsTracking(false);
  };

  // ▶️ RESUME
  const resume = async () => {
    if (isTracking) return;

    setIsTracking(true);
    await startTracking();
  };

  // 🛑 STOP
  const stop = () => {
    // stop timer
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }

    // stop GPS
    if (locationSub.current) {
      locationSub.current.remove();
      locationSub.current = null;
    }

    setIsTracking(false);

    // compute avg speed safely
    const avgSpeed = duration > 0 ? distance / duration : 0;

    const result = {
      distance,
      duration,
      calories,
      avgSpeed,
    };

    // 🔥 reset state for next session
    setDistance(0);
    setDuration(0);
    setCalories(0);
    prevLocation.current = null;

    return result;
  };

  // 🔥 live calorie calculation
  useEffect(() => {
    const hours = duration / 3600;
    const cal = MET[type] * weight * hours;
    setCalories(cal);
  }, [duration, type, weight]);

  // 🧹 cleanup on unmount (VERY IMPORTANT)
  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
      if (locationSub.current) locationSub.current.remove();
    };
  }, []);

  // ⚡ derived speed (real-time)
  const speed = duration > 0 ? distance / duration : 0;

  return {
    distance,
    duration,
    calories,
    speed,
    isTracking,
    start,
    pause,
    resume,
    stop,
  };
};
