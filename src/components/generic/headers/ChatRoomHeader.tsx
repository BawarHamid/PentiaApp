import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Colors from "../../../utils/constants/Colors";

type ChatRoomHeaderProps = {
  title: string;
  icon: ReactElement;
};

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ title, icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        alignItems: "center",
      }}
    >
      {/* goback icon */}
      <TouchableOpacity>{icon}</TouchableOpacity>
      {/* Header title */}
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 24,
          color: Colors["primary-white"],
        }}
      >
        {title}
      </Text>
      {/* trigger pop-up menu */}
      <TouchableOpacity>{icon}</TouchableOpacity>
    </View>
  );
};

export default ChatRoomHeader;
