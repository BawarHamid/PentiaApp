import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import PentiaLogo from "../assets/images/LogoImgs/PentiaLogo.png";
import { Dimensions } from "react-native";
import Animated, {
  FlipInYLeft,
  FlipOutYRight,
  PinwheelIn,
  PinwheelOut,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const ChatRoomScreen = () => {
  return (
    <View
      className="mt-2"
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.2,
      }}
    >
      <View>
        <Text className="text-center">
          You are logged in! ChatRoomScreenChatRoomScreenChatRoomScreen
        </Text>
        <Text className="text-center">All the chats are displayed here</Text>
      </View>

      <View className="items-end">
        <TouchableOpacity>
          {/* <VectorIcon
            type="Entypo"
            name="chevron-left"
            color="black"
            size={24}
          /> */}
          <Animated.Image
            entering={FlipInYLeft}
            exiting={FlipOutYRight}
            source={PentiaLogo}
            className="h-10 w-10"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoomScreen;
