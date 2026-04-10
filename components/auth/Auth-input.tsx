import { TextInput, View } from "react-native";
import { Text } from "../ui/text";
interface AuthInputPorps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}
export const AuthInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  label,
}: AuthInputPorps) => {
  return (
    <View className="gap-1">
      <Text>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"#888"}
        secureTextEntry={secureTextEntry}
        className="bg-neutral-800 text-white px-4 py-3 rounded-xl border border-neutral-700"
      />
    </View>
  );
};
