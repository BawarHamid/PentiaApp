import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Colors from "../../../utils/constants/Colors";
import CustomPopUpMenu from "../../overlay/menu/CustomPopUpMenu";

type ChatListHeaderProps = {
  title: string;
  icon: ReactElement;
};

const ChatListHeader: React.FC<ChatListHeaderProps> = ({ title, icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 28,
          color: Colors["primary-white"],
        }}
      >
        {title}
      </Text>
      <CustomPopUpMenu icon={icon} />
    </View>
  );
};

export default ChatListHeader;
