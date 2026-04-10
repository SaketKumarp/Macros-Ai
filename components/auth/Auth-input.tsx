import { TextInput, View } from "react-native";
import { Text } from "../ui/text";
interface AuthInputPorps {
  label: string;
  input: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}
export const AuthInput = ({
  label,
  input,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}: AuthInputPorps) => {
  return (
    <View>
      <Text>
        <TextInput></TextInput>
      </Text>
    </View>
  );
};
