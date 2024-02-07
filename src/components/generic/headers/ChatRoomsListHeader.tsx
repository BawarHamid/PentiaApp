import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Colors from "../../../utils/constants/Colors";
import CustomPopUpMenu from "../../overlay/menu/CustomPopUpMenu";

type ChatRoomListHeaderProps = {
  title: string;
  icon: ReactElement;
};

const ChatRoomListHeader: React.FC<ChatRoomListHeaderProps> = ({
  title,
  icon,
}) => {
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

export default ChatRoomListHeader;
