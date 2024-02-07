import { View, Text } from "react-native";
import React, { useState } from "react";
import Colors from "../../../utils/constants/Colors";

const Chat = ({ route }) => {
  const [chat, setChat] = useState(null);
  const { item } = route.params;
  // console.log("chatroom Info:", item);
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>{item.chatname}</Text>
    </View>
  );
};

export default Chat;
