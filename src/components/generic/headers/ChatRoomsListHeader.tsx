import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Colors from "../../../utils/constants/Colors";
import CustomPopUpMenu from "../../overlay/menu/CustomPopUpMenu";
import normalize from "react-native-normalize";

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
        paddingHorizontal: normalize(26),
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: normalize(29),
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
