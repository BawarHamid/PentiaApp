import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../../../firebase/FirebaseConfig";
import Colors from "../../../utils/constants/Colors";
import { useAuth } from "../../../context/UserContext";
import VectorIcon from "../../../assets/icons/VectorIcons";

const Message = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { item } = route.params;
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<ScrollView>(null);
  const { user } = useAuth();

  const getChatRoomMessages = useCallback(async () => {
    try {
      const messageQuery = query(
        collection(database, "chatrooms", item.chatroomId, "messages"),
        // Fetching the first 50 messages ordered by timeCreated
        orderBy("timeCreated", "desc"),
        limit(50)
      );

      const unsub = onSnapshot(messageQuery, (querySnapshot) => {
        const allMessages = querySnapshot.docs.map((doc) => doc.data());
        // Append the new messages to the existing messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          ...allMessages.reverse(),
        ]);
        setLoading(false);

        // scrolls down to the end on fetch
        if (scrollRef.current) {
          UpdateScroll();
        }
      });

      const KeyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        UpdateScroll
      );
      // needs to be cleared as the component unmounts
      return () => {
        unsub();
        KeyboardDidShowListener.remove();
      };
    } catch (error) {
      Alert.alert(String(error));
    }
  }, [messages]);

  useEffect(() => {
    UpdateScroll();
    getChatRoomMessages();
  }, []);

  // func to scroll to bottom of list
  const UpdateScroll = () => {
    if (scrollRef.current) {
      setTimeout(
        () => scrollRef.current?.scrollToEnd({ animated: false }),
        100
      );
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: height * 0.2,
        }}
        size="large"
        color={Colors["primary-yellow"]}
      />
    );
  }

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {messages.map((msgItem, index) => (
        <View key={index} style={{ marginVertical: 8 }}>
          {/* this is what the logged-in user see */}
          {user?.userId === msgItem.userId ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 10,
                marginBottom: 20,
              }}
            >
              {/* Chat bubble - you */}
              <View
                style={{
                  maxWidth: "80%",
                  backgroundColor: Colors["primary-textinputbg"],
                  borderRadius: 20,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  style={{
                    color: Colors["primary-white"],
                    fontFamily: "Montserrat-Medium",
                    fontSize: 14,
                  }}
                >
                  {msgItem.message}
                </Text>
              </View>
            </View>
          ) : (
            // this is what the receiver see
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginLeft: 10,
                marginBottom: 20,
              }}
            >
              <VectorIcon
                type={"Ionicons"}
                name="person-circle-outline"
                color={Colors["primary-messagebg-grey"]}
                size={34}
                style={{ marginRight: 8 }}
              />
              {/* Chat bubble - receiver */}

              <View
                style={{
                  maxWidth: "80%",
                  backgroundColor: Colors["primary-messagebg-grey"],
                  borderRadius: 20,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  style={{
                    color: Colors["primary-yellow"],
                    fontFamily: "Montserrat-Medium",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  {msgItem.username}
                </Text>
                <Text
                  style={{
                    color: Colors["primary-white"],
                    fontFamily: "Montserrat-Medium",
                    fontSize: 14,
                  }}
                >
                  {msgItem.message}
                </Text>
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default Message;
