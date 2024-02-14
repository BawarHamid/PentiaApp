import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Colors from "../../../utils/constants/Colors";
import CustomPopUpMenu from "../../overlay/menu/CustomPopUpMenu";
import { useNavigation } from "@react-navigation/native";

type ChatHeaderProps = {
  title: string;
  iconLeft: ReactElement;
  iconRight: ReactElement;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  iconLeft,
  iconRight,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 25,
        alignItems: "center",
        backgroundColor: Colors["primary-darkbg"],
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {iconLeft}
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 19,
          color: Colors["primary-white"],
        }}
      >
        {title}
      </Text>
      <CustomPopUpMenu icon={iconRight} />
    </View>
  );
};

export default ChatHeader;
