import { View, Dimensions, Alert, Keyboard } from "react-native";
import React, { useState } from "react";
import Colors from "../../utils/constants/Colors";
import ChatHeader from "../../components/generic/headers/ChatHeader";
import VectorIcon from "../../assets/icons/VectorIcons";
import MessageList from "../../components/chat/message/MessageList";
import LottieView from "lottie-react-native";
import MessageSender from "../../components/chat/message/MessageSender";

const ChatScreen = ({ route }) => {
  const [loading] = useState<boolean>(false);
  const { width, height } = Dimensions.get("window");
  const { item } = route.params;

  if (loading) {
    return (
      <View
        style={[
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
            width: width * 0.2,
            height: height * 0.2,
            marginTop: height * 0.2,
          }}
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
        <MessageList route={route} />
      </View>
      <View style={{ paddingTop: 4 }}>
        <MessageSender route={route} />
      </View>
    </View>
  );
};

export default ChatScreen;
