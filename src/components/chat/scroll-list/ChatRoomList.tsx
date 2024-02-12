import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Colors from "../../../utils/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import VectorIcon from "../../../assets/icons/VectorIcons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../../firebase/FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const ChatRoomList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const listRef = useRef<FlatList>(null);
  const [chatRooms, setChatRooms] = useState(null);
  const navigation = useNavigation();

  const getChatRooms = useCallback(async () => {
    try {
      if (!refreshing) {
        // Only show the loading indicator if not already refreshing
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
  // console.log("chatrooms", chatRooms);
  const renderChatItem: ListRenderItem<any> = ({ item }) => (
    <TouchableOpacity
      onPress={() => (navigation as any).navigate("Chat", { item: item })}
    >
      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: height * 0.04, // gap between the chats
        }}
      >
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
              color: Colors["primary-medium-grey"],
            }}
          >
            {item.description}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
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
      keyExtractor={(item, index) => index.toString()}
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
    />
  );
};

export default ChatRoomList;
