import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
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
import VectorIcon from "../../../assets/icons/VectorIcons";
import { useAuth } from "../../../context/useAuth";
import { messages } from "../../../types/Types";
import LottieView from "lottie-react-native";
import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";

const MessageList = ({ route }) => {
  const [messages, setMessages] = useState<messages[]>([]);
  const { item } = route.params;
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<ScrollView>(null);
  const { user } = useAuth();

  const getChatRoomMessages = useCallback(async () => {
    try {
      const messageQuery = query(
        collection(database, "chatrooms", item.chatroomId, "messages"),
        // Fetching the from the "newest" value
        orderBy("timeCreated", "desc"),
        limit(50)
      );

      const unsub = onSnapshot(messageQuery, (querySnapshot) => {
        const allMessages: messages[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as messages),
        }));
        setMessages(allMessages.reverse());
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
      console.log("Message Error:", error);
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
      <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <LottieView
          source={require("../../../assets/Animations/Loadings/LoadingAnimation1.json")}
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
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {messages.length > 0 ? (
        messages.map((msgItem, index) => (
          <View key={index} style={{ marginVertical: 8 }}>
            {/* Render timestamp */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              {/* Render timestamp */}
              <Text
                style={{
                  color: Colors["primary-grey"],
                  fontFamily: "Montserrat-SemiBold",
                  fontSize: 12,
                }}
              >
                {msgItem.timeCreated.seconds !== undefined && (
                  <>
                    {/* Render date */}
                    <Text>
                      {new Date(
                        msgItem.timeCreated.seconds * 1000
                      ).toLocaleDateString("da-DK", {
                        day: "2-digit",
                        month: "short",
                        timeZone: "Europe/Copenhagen",
                      })}
                    </Text>
                    {/* Render time */}
                    <Text>
                      {new Date(
                        msgItem.timeCreated.seconds * 1000
                      ).toLocaleTimeString("da-DK", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                        timeZone: "Europe/Copenhagen",
                      })}
                    </Text>
                  </>
                )}
              </Text>
            </View>

            {/* this is what the logged-in user see */}
            {user?.uid === msgItem.userId ? (
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
        ))
      ) : (
        <Animated.View
          entering={FadeInUp}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: Colors["primary-yellow"],
              fontFamily: "Montserrat-SemiBold",
              backgroundColor: Colors["primary-lightbg"],
              borderRadius: 20,
              paddingVertical: height * 0.04,
              paddingHorizontal: 25,
            }}
          >
            Welcome to the chat! {"\n"}
            Start the conversation by typing your message.
          </Text>
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default MessageList;
