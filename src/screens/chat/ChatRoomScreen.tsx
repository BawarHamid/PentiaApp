import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import PentiaLogo from "../../assets/images/LogoImgs/PentiaLogo.png";
import { Dimensions } from "react-native";
import Animated, { FlipInYLeft, FlipOutYRight } from "react-native-reanimated";
import { useAuth } from "../../context/UserContext";
import { defaultStyles } from "../../utils/constants/Styles";
import Header from "../../components/generic/headers/Header";
import VectorIcon from "../../assets/icons/VectorIcons";
import Colors from "../../utils/constants/Colors";
import RecentScrollView from "../../components/generic/scrollviews/RecentScrollView";
const { width, height } = Dimensions.get("window");

const RecentChatList = [
  {
    img: { PentiaLogo },
    username: "Larry",
  },
  {
    img: { PentiaLogo },
    username: "Larry",
  },
  {
    img: { PentiaLogo },
    username: "Larry",
  },
];

const ChatRoomScreen = () => {
  const { logout, user } = useAuth();
  console.log("userdata ChatRoom", user);

  return (
    <View style={defaultStyles.container}>
      <View style={{ marginTop: height * 0.05 }}>
        <Header
          title="Messages"
          icon={
            <VectorIcon
              type={"Ionicons"}
              name="search"
              color={Colors["primary-blue"]}
              size={28}
            />
          }
        />
      </View>
      <View style={{ marginTop: height * 0.015 }}>
        {RecentChatList.map((chats, index) => (
          <TouchableOpacity key={index}>
            <RecentScrollView
              title="R E C E N T"
              img={PentiaLogo}
              username="Barry"
            />
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: height * 0.2,
        }}
      >
        <View>
          <Text className="text-center">Hi {user?.username}</Text>

          <Text className="text-center">
            You are logged in! ChatRoomScreenChatRoomScreenChatRoomScreen
          </Text>
          <Text className="text-center">All the chats are displayed here</Text>
        </View>

        <View className="items-end">
          <TouchableOpacity onPress={() => logout()}>
            {/* <VectorIcon
            type="Entypo"
            name="chevron-left"
            color="black"
            size={24}
          /> */}
            <Animated.Image
              entering={FlipInYLeft}
              exiting={FlipOutYRight}
              source={PentiaLogo}
              className="h-10 w-10"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatRoomScreen;
