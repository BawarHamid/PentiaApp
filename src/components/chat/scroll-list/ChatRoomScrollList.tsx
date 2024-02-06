import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
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
import ChatRoomScrollListAvatar from "../../generic/avatar/ChatRoomScrollListAvatar";
import Colors from "../../../utils/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import VectorIcon from "../../../assets/icons/VectorIcons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../../firebase/FirebaseConfig";
const { width, height } = Dimensions.get("window");

const RecentChatList = [
  {
    img: pb7,
    username: "Emil",
    chatName: "Gaminggggg:)",
    description: "Our private gaming chat, only for us",
    message: "Er du hjemme?",
    messageDate: "08:30",
  },
  {
    img: pb4,
    username: "Karen",
    chatName: "CarLoverssssss 🚗✨🚗✨",
    description:
      "Passionate about cars? Join our group to discuss the latest models, share tips, and connect with fellow car enthusiasts!  🚗✨",
    message: "Er du hjemme?",
    messageDate: "08:30",
  },
  {
    img: pb8,
    username: "Joakim",
    chatName: "football team 10b",
    description: "group chat for students from 10b semester",
    message: "Er du hjemme?",
    messageDate: "08:30",
  },
  {
    img: pb11,
    username: "Tina",
    chatName: "Computer scientist, team 2024B group chat",
    description: "our group chat, for students in semester group 2024B",
    message: "Er du hjemme?",
    messageDate: "08:30",
  },
  {
    img: pb9,
    username: "Ahmad",
    chatName: "Fit and Fun Club",
    description:
      "Stay active, stay playful! Join our fitness and fun community to discuss workouts, outdoor adventures, and all things active living",
    messageDate: "08:30",
  },
  {
    img: pb10,
    username: "Henrik",
    chatName: "Andersen-Family",
    description: "The Andersen family's groupchat! Only good vibes guys <3",
    message: "Er du hjemme?",
    messageDate: "08:30",
  },
  {
    img: pb6,
    username: "Marc",
    chatName: "Pixel Purrfection",
    description:
      "Gaming and cats unite! Discuss your favorite games, share cat-themed gaming memes, and celebrate the joy of gaming with your feline friends",
    message: "Er du hjemme?",
    messageDate: "08:30",
  },
  {
    img: pb1,
    username: "Frederik",
    chatName: "Football Squad2",
    description:
      "Kick it with us! Connect with fellow soccer enthusiasts, discuss matches, and share your favorite soccer moments in our spirited community.",
    message: "Er du hjemme?",
    messageDate: "08:30",
  },
  {
    img: pb2,
    username: "Jens",
    chatName: "The Fitness Club",
    description:
      "Get fit, stay positive. Join us for fitness motivation, workout tips, and a supportive community to achieve your health goals!",
    message: "Er du hjemme?",
    messageDate: "08:30",
  },
  {
    img: pb3,
    username: "Line",
    chatName: "MedStudy Buddies",
    description:
      "Collaborate, share resources, and conquer your medical studies together!",
    messageDate: "08:30",
  },
  {
    img: pb5,
    username: "Line",
    chatName: "Gamers",
    description:
      "Level up together! Dive into the gaming world with our guild. ",
    messageDate: "08:30",
  },
];

const ChatRoomScrollList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const listRef = useRef<FlatList>(null);
  const [chatRooms, setChatRooms] = useState(null);

  useLayoutEffect(() => {
    const chatRoomQuery = query(
      collection(database, "chatrooms"),
      orderBy("chatroomId", "desc")
    );

    const listenerStop = onSnapshot(chatRoomQuery, (querySnapShot) => {
      const rooms = querySnapShot.docs.map((doc) => doc.data());
      setChatRooms(rooms);
      setLoading(false);
    });

    return listenerStop;
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (loading) {
    // A loading indicator is triggered, while waiting for auth state
    return (
      <ActivityIndicator
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            marginTop: height * 0.2,
          },
        ]}
        size="large"
        color={Colors["primary-yellow"]}
      />
    );
  }

  const renderChatItem: ListRenderItem<any> = ({ item }) => (
    <TouchableOpacity>
      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 30, // gap between the chats
        }}
      >
        {/* <ChatRoomScrollListAvatar imgUrl={item.img} /> */}
        <View
          style={{
            marginLeft: 20,
            gap: 4,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              fontSize: 14,
              color: Colors["primary-white"],
            }}
          >
            {item.chatname}
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              fontSize: 12,
              color: "#9CA3AF",
            }}
          >
            {item.description}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          {/* <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              fontSize: 14,
              color: "#9CA3AF",
            }}
          >
            {item.messageDate}
          </Text> */}

          <VectorIcon
            type={"Ionicons"}
            name="chevron-forward"
            color={Colors["primary-white"]}
            size={26}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ref={listRef}
      data={chatRooms}
      renderItem={renderChatItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        backgroundColor: Colors["primary-lightbg"],
        borderRadius: 50,
        paddingBottom: height * 0.23,
        paddingHorizontal: 25,
        paddingTop: height * 0.045,
      }}
      // ListFooterComponent={() => (
      //   <Animated.View style={{ height: height * 0.5 }} />
      // )}
    />
  );
};

export default ChatRoomScrollList;
