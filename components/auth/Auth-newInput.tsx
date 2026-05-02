import { KeyboardTypeOptions, TextInput, View } from "react-native";
import { Text } from "../ui/text";

interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const Authinput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  label,
  keyboardType,
}: AuthInputProps) => {
  return (
    <View className="gap-1.5">
      <Text
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 10,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.2)"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.07)",
          borderWidth: 0.75,
          borderColor: "rgba(255, 255, 255, 0.12)",
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 13,
          color: "#ffffff",
          fontSize: 15,
        }}
      />
    </View>
  );
};
