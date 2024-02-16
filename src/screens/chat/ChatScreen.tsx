import { View } from "react-native";
import React, { useState } from "react";
import Colors from "../../utils/constants/Colors";
import ChatHeader from "../../components/generic/headers/ChatHeader";
import VectorIcon from "../../assets/icons/VectorIcons";
import MessageList from "../../components/chat/scroll-list/MessageList";
import LottieView from "lottie-react-native";
import SendMessageForm from "../../components/chat/message/SendMessageForm";
import { defaultStyles } from "../../utils/constants/Styles";
import normalize from "react-native-normalize";

const ChatScreen = ({ route }) => {
  const [loading] = useState<boolean>(false);
  const { item } = route.params;

  if (loading) {
    return (
      <View
        style={[
          defaultStyles.containerDarkTheme,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <LottieView
          source={require("../../assets/Animations/Loadings/LoadingAnimation1.json")}
          autoPlay
          loop
          resizeMode="cover"
          style={{
            width: normalize(145),
            height: normalize(145),
          }}
        />
      </View>
    );
  }

  return (
    <View style={[defaultStyles.containerDarkTheme]}>
      <View style={{ marginTop: normalize(28) }}>
        <ChatHeader
          iconLeft={
            <VectorIcon
              type={"Ionicons"}
              name="chevron-back"
              color={Colors["primary-white"]}
              size={normalize(27)}
            />
          }
          title={item.chatname}
          iconRight={
            <VectorIcon
              type={"Ionicons"}
              name="ellipsis-horizontal"
              color={Colors["primary-white"]}
              size={normalize(27)}
            />
          }
        />
      </View>
      <View
        style={{
          marginTop: normalize(50),
          flex: 1,
        }}
      >
        <MessageList route={route} />
      </View>
      <View style={{ paddingTop: normalize(15) }}>
        <SendMessageForm route={route} />
      </View>
    </View>
  );
};

export default ChatScreen;
