import { View, Text } from "react-native";
import { Dimensions } from "react-native";
import ChatRoomListHeader from "../../components/generic/headers/ChatRoomsListHeader";
import VectorIcon from "../../assets/icons/VectorIcons";
import Colors from "../../utils/constants/Colors";
import RecentChatList from "../../components/chat/scroll-list/RecentChatList";
import ChatRoomList from "../../components/chat/scroll-list/ChatRoomList";
import { defaultStyles } from "../../utils/constants/Styles";
import normalize from "react-native-normalize";

const ChatRoomScreen = () => {
  return (
    <View style={[defaultStyles.containerDarkTheme]}>
      {/* Header - view */}
      <View style={{ marginTop: normalize(28) }}>
        <ChatRoomListHeader
          title="Messages"
          icon={
            <VectorIcon
              type={"Ionicons"}
              name="ellipsis-horizontal"
              color={Colors["primary-white"]}
              size={normalize(31)}
            />
          }
        />
      </View>
      {/* Recent-content view */}
      <View style={{ marginTop: normalize(16) }}>
        <Text
          style={{
            fontFamily: "Montserrat-Medium",
            fontSize: normalize(14),
            color: Colors["primary-yellow"],
            paddingLeft: normalize(26),
          }}
        >
          R E C E N T
        </Text>
        <View style={{ marginTop: normalize(18) }}>
          <RecentChatList />
        </View>
      </View>

      {/* List of all chat rooms - view */}
      <View style={{ marginTop: normalize(32) }}>
        <ChatRoomList />
      </View>
    </View>
  );
};

export default ChatRoomScreen;
