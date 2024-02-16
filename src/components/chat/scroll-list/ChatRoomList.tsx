import {
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ListRenderItem,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Colors from "../../../utils/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import VectorIcon from "../../../assets/icons/VectorIcons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../../firebase/FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { chatrooms } from "../../../types/Types";
import LottieView from "lottie-react-native";
import normalize from "react-native-normalize";
import { defaultStyles } from "../../../utils/constants/Styles";

const ChatRoomList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const listRef = useRef<FlatList>(null);
  const [chatRooms, setChatRooms] = useState<chatrooms[]>([]);
  const navigation = useNavigation();

  const getChatRooms = useCallback(async () => {
    try {
      if (!refreshing) {
        setLoading(true);
      }
      const chatRoomQuery = query(
        collection(database, "chatrooms"),
        orderBy("chatroomId", "desc")
      );

      const unsub = onSnapshot(chatRoomQuery, (querySnapshot) => {
        const rooms = querySnapshot.docs.map((doc) => doc.data());
        setChatRooms(rooms);
        setRefreshing(false);
        setLoading(false);
      });
      // needs to be cleared as the component unmounts
      return () => unsub();
    } catch (error) {
      Alert.alert(String(error));
      console.log("ChatRooms Error:", error);
    }
  }, []);

  useEffect(() => {
    getChatRooms();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getChatRooms();
  };

  if (loading) {
    return (
      <View
        style={[
          defaultStyles.containerDarkTheme,
          {
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50%",
          },
        ]}
      >
        <LottieView
          source={require("../../../assets/Animations/Loadings/LoadingAnimation1.json")}
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

  const renderChatItem: ListRenderItem<chatrooms> = ({ item }) => (
    <TouchableOpacity
      onPress={() => (navigation as any).navigate("chat", { item: item })}
    >
      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: normalize(32),
        }}
      >
        <View
          style={{
            marginLeft: normalize(21),
            gap: normalize(5),
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
              fontSize: normalize(14),
              color: Colors["primary-medium-grey"],
            }}
          >
            {item.description}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", alignSelf: "center" }}>
          <VectorIcon
            type={"Ionicons"}
            name="chevron-forward"
            color={Colors["primary-white"]}
            size={normalize(27)}
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
        borderRadius: normalize(51),
        paddingBottom: normalize(185),
        paddingHorizontal: normalize(26),
        paddingTop: normalize(33),
      }}
    />
  );
};

export default ChatRoomList;
