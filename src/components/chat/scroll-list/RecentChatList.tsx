import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../../utils/constants/Colors";
import RecentViewAvatar from "../../generic/avatar/RecentViewAvatar";
import pb1 from "../../../assets/images/dummy-data/Ellipse1.png";
import pb2 from "../../../assets/images/dummy-data/Ellipse2.png";
import pb3 from "../../../assets/images/dummy-data/Ellipse3.png";
import pb4 from "../../../assets/images/dummy-data/Ellipse4.png";
import pb5 from "../../../assets/images/dummy-data/Ellipse5.png";
import pb6 from "../../../assets/images/dummy-data/Ellipse6.png";
import pb7 from "../../../assets/images/dummy-data/Ellipse7.png";
import pb8 from "../../../assets/images/dummy-data/Ellipse8.png";
import pb9 from "../../../assets/images/dummy-data/Ellipse9.png";
import pb10 from "../../../assets/images/dummy-data/Ellipse10.png";
import pb11 from "../../../assets/images/dummy-data/Ellipse11.png";

type RecentChatListProps = {
  // img?: ImageSourcePropType | undefined;
  // username?: string;
};

const ChatList = [
  {
    img: pb7,
    username: "Emil",
  },
  {
    img: pb8,
    username: "Joakim",
  },
  {
    img: pb11,
    username: "Tina",
  },
  {
    img: pb9,
    username: "Ahmad",
  },
  {
    img: pb10,
    username: "Henrik",
  },
  {
    img: pb6,
    username: "Marc",
  },
  {
    img: pb1,
    username: "Frederik",
  },
  {
    img: pb2,
    username: "Jens",
  },
  {
    img: pb3,
    username: "Line",
  },
  {
    img: pb4,
    username: "Karen",
  },
  {
    img: pb5,
    username: "Anders",
  },
];

const RecentChatList: React.FC = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 20,
        paddingHorizontal: 25, // for nicer corner at the end of the scroll aswell
      }}
    >
      {ChatList.map((recentChats, key) => (
        <TouchableOpacity key={key} style={{ alignItems: "center", gap: 8 }}>
          <RecentViewAvatar imgUrl={recentChats.img} />
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              fontSize: 14,
              color: Colors["primary-white"],
            }}
          >
            {recentChats.username}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RecentChatList;
