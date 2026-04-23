import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { useClerk, useUser } from "@clerk/expo";
import { useToast } from "@/providers/toast";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ProfileSheet = ({ visible, onClose }: Props) => {
  const { showToast } = useToast();
  const { user } = useUser();
  const { signOut } = useClerk();
  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* 🔥 Overlay */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-black/60 justify-end"
      >
        {/* 🔥 Sheet */}
        <TouchableOpacity
          activeOpacity={1}
          className="bg-[#1c1c1e] rounded-t-3xl p-6"
        >
          {/* Handle */}
          <View className="w-12 h-1 bg-gray-600 rounded-full self-center mb-4" />

          {/* Profile */}
          <View className="items-center mb-6">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-16 h-16 rounded-full mb-2"
            />
            <Text className="text-white text-lg font-semibold">
              {user?.fullName}
            </Text>
            <Text className="text-gray-400 text-sm">
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>

          {/* Actions */}
          <TouchableOpacity
            onPress={() => {
              signOut();
              showToast("logged out");
            }}
            className="bg-red-500 py-3 rounded-xl items-center"
          >
            <Text className="text-white font-semibold">Sign Out</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
