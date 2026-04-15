import { Text } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
} from "react-native-reanimated";
import { CheckCircle, XCircle, Info } from "lucide-react-native";

type Props = {
  message: string;
  type: "success" | "error" | "info";
  log?: string;
};

export default function Toast({ message, type, log }: Props) {
  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-600",
          icon: <CheckCircle color="white" size={18} />,
        };
      case "error":
        return {
          bg: "bg-red-600",
          icon: <XCircle color="white" size={18} />,
          log: log,
        };
      default:
        return {
          bg: "bg-zinc-800",
          icon: <Info color="white" size={18} />,
        };
    }
  };

  const { bg, icon } = getStyles();

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(200)}
      layout={Layout.springify()}
      className={`flex-row items-center gap-3 px-4 py-3 rounded-xl ${bg}`}
    >
      {icon}
      <Text className="text-white text-sm font-medium">{message}</Text>
      <Text className="text-white text-sm font-medium">{log}</Text>
    </Animated.View>
  );
}
