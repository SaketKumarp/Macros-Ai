import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useToast } from "@/providers/toast";
import { useClerk, useUser } from "@clerk/expo";
import { Image, View } from "react-native";

interface ProfileDropDownProps {
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
}

export const ProfileDropDown = ({
  onProfilePress,
  onSettingsPress,
}: ProfileDropDownProps) => {
  const { showToast } = useToast();

  const { user } = useUser();

  const { signOut } = useClerk();

  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };

  const handleLogout = async () => {
    try {
      await signOut();

      showToast("Logged out successfully");
    } catch (error) {
      showToast("Failed to logout", "error");
      console.log("error", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 border-0 bg-transparent">
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-10 h-10 rounded-full border border-gray-600"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        insets={contentInsets}
        sideOffset={8}
        align="end"
        className="w-64 bg-[#1c1c1e] border border-gray-800"
      >
        {/* User Info */}
        <View className="px-2 py-3">
          <Text className="text-white font-semibold text-base">
            {user?.fullName}
          </Text>

          <Text className="text-gray-400 text-sm">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onPress={onProfilePress}>
            <Text className="text-white">Profile</Text>

            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem onPress={onSettingsPress}>
            <Text className="text-white">Settings</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onPress={handleLogout}>
          <Text className="text-red-400 font-bold">Log out</Text>

          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
