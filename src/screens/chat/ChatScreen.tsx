import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import Colors from "../../utils/constants/Colors";
import ChatHeader from "../../components/generic/headers/ChatHeader";
import VectorIcon from "../../assets/icons/VectorIcons";
import Chat from "../../components/chat/message/Chat";
import MessageTextInput from "../../components/chat/message/MessageTextInput";
import CustomKeyBoardView from "../../components/keyboard-view/CustomKeyBoardView";

const ChatScreen = ({ route }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { width, height } = Dimensions.get("window");
  const { item } = route.params;

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors["primary-darkbg"] }}>
        <ActivityIndicator
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              marginTop: height * 0.45,
            },
          ]}
          size="large"
          color={Colors["primary-yellow"]}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors["primary-darkbg"] }}>
      <View style={{ marginTop: height * 0.035 }}>
        <ChatHeader
          iconLeft={
            <VectorIcon
              type={"Ionicons"}
              name="chevron-back"
              color={Colors["primary-white"]}
              size={26}
            />
          }
          title={item.chatname}
          iconRight={
            <VectorIcon
              type={"Ionicons"}
              name="ellipsis-horizontal"
              color={Colors["primary-white"]}
              size={26}
            />
          }
        />
      </View>
      <View style={{ marginTop: height * 0.09, flex: 1 }}>
        <Chat route={route} />
      </View>
      <View style={{ paddingTop: 4 }}>
        <MessageTextInput
          iconLeft={
            <VectorIcon
              type={"Ionicons"}
              name="image-outline"
              color={Colors["primary-black"]}
              size={24}
            />
          }
          placeholder="Message"
          placeholderTextColor={Colors["primary-medium-grey"]}
          iconRight={
            <VectorIcon
              type={"Ionicons"}
              name="send-outline"
              color={Colors["primary-iconbg-grey"]}
              size={22}
            />
          }
        />
      </View>
    </View>
  );
};

export default ChatScreen;
