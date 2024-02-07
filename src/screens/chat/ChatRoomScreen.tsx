import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import PentiaLogo from "../../assets/images/LogoImgs/PentiaLogo.png";
import { Dimensions } from "react-native";
import Animated, { FlipInYLeft, FlipOutYRight } from "react-native-reanimated";
import { useAuth } from "../../context/UserContext";
import ChatRoomListHeader from "../../components/generic/headers/ChatRoomsListHeader";
import VectorIcon from "../../assets/icons/VectorIcons";
import Colors from "../../utils/constants/Colors";
import RecentChatList from "../../components/chat/scroll-list/RecentChatList";
import ChatRoomList from "../../components/chat/scroll-list/ChatRoomList";

const ChatRoomScreen = () => {
  const { user } = useAuth();
  const { width, height } = Dimensions.get("window");

  console.log("userdata ChatRoom", user);

  return (
    <View style={{ flex: 1, backgroundColor: Colors["primary-darkbg"] }}>
      {/* Header - view */}
      <View style={{ marginTop: height * 0.035 }}>
        <ChatRoomListHeader
          title="Messages"
          icon={
            <VectorIcon
              type={"Ionicons"}
              name="ellipsis-horizontal"
              color={Colors["primary-white"]}
              size={30}
            />
          }
        />
      </View>
      {/* Recent-content view */}
      <View style={{ marginTop: height * 0.018 }}>
        <Text
          style={{
            fontFamily: "Montserrat-Medium",
            fontSize: 12,
            color: Colors["primary-yellow"],
            paddingLeft: 25,
          }}
        >
          R E C E N T
        </Text>
        <View style={{ marginTop: height * 0.02 }}>
          <RecentChatList />
        </View>
      </View>

      {/* List of all chat rooms - view */}
      <View style={{ marginTop: height * 0.04 }}>
        <ChatRoomList />
      </View>
    </View>
  );
};

export default ChatRoomScreen;
