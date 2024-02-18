import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, Keyboard, Alert, Image } from "react-native";
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
import Animated, { FadeInUp } from "react-native-reanimated";
import normalize from "react-native-normalize";
import { defaultStyles } from "../../../utils/constants/Styles";
import PentiaLight from "../../../assets/images/LogoImgs/PentiaLight.png";

const MessageList = ({ route }) => {
  const [messages, setMessages] = useState<messages[]>([]);
  const { item } = route.params;
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
      Alert.alert("Message Error", String(error));
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
          defaultStyles.containerDarkTheme,
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
            width: normalize(145),
            height: normalize(145),
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={{ paddingHorizontal: normalize(11) }}
    >
      {messages.length > 0 ? (
        messages.map((msgItem, index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: normalize(16),
              }}
            >
              {/* Render timestamp */}
              {msgItem.timeCreated.seconds !== undefined && (
                <>
                  {/* Render date */}
                  <Text
                    style={{
                      color: Colors["primary-grey"],
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: normalize(14),
                      marginRight: normalize(4),
                    }}
                  >
                    {new Date(
                      msgItem.timeCreated.seconds * 1000
                    ).toLocaleDateString("da-DK", {
                      day: "2-digit",
                      month: "short",
                      timeZone: "Europe/Copenhagen",
                    })}
                  </Text>
                  <Text
                    style={{
                      color: Colors["primary-grey"],
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: normalize(14),
                    }}
                  >
                    at{" "}
                  </Text>
                  {/* Render time */}
                  <Text
                    style={{
                      color: Colors["primary-grey"],
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: normalize(14),
                    }}
                  >
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
            </View>

            {/* this is what the logged-in user see */}
            {user?.uid === msgItem.userId ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginRight: normalize(12),
                  marginBottom: normalize(16),
                }}
              >
                {/* Conditional rendering for Chat bubble - you, checks if its http then it get's the img's url */}
                {msgItem.message.startsWith("http") ? (
                  <View
                    style={{
                      maxWidth: "90%",
                      borderRadius: normalize(20),
                      paddingVertical: normalize(10),
                      paddingHorizontal: normalize(10),
                    }}
                  >
                    <Image
                      source={{ uri: msgItem.message }}
                      style={{
                        width: normalize(290),
                        height: normalize(200),
                        borderRadius: normalize(20),
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      maxWidth: "80%",
                      backgroundColor: Colors["primary-textinputbg"],
                      borderRadius: normalize(20),
                      paddingVertical: normalize(10),
                      paddingHorizontal: normalize(14),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors["primary-white"],
                        fontFamily: "Montserrat-Medium",
                        fontSize: normalize(16),
                      }}
                    >
                      {msgItem.message}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              // This is what the reciver see
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginLeft: normalize(12),
                  marginBottom: normalize(16),
                }}
              >
                {msgItem.profile_picture ? (
                  <Image
                    style={{
                      marginRight: normalize(10),
                      width: normalize(34),
                      height: normalize(34),
                      borderRadius: normalize(50),
                    }}
                    source={{ uri: msgItem.profile_picture }}
                  />
                ) : (
                  <Image
                    style={{
                      marginRight: normalize(10),
                      width: normalize(34),
                      height: normalize(34),
                      borderRadius: normalize(50),
                    }}
                    source={PentiaLight}
                  />
                )}
                {msgItem.message.startsWith("http") ? (
                  <View
                    style={{
                      maxWidth: "90%",
                      borderRadius: normalize(20),
                      paddingVertical: normalize(10),
                      paddingHorizontal: normalize(10),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors["primary-yellow"],
                        fontFamily: "Montserrat-Medium",
                        fontSize: normalize(14),
                        marginBottom: normalize(10),
                      }}
                    >
                      {msgItem.username}
                    </Text>
                    <Image
                      source={{ uri: msgItem.message }}
                      style={{
                        width: normalize(290),
                        height: normalize(200),
                        borderRadius: normalize(11),
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      maxWidth: "80%",
                      backgroundColor: Colors["primary-messagebg-grey"],

                      borderRadius: normalize(20),
                      paddingVertical: normalize(10),
                      paddingHorizontal: normalize(14),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors["primary-yellow"],
                        fontFamily: "Montserrat-Medium",
                        fontSize: normalize(14),
                        marginBottom: normalize(2),
                      }}
                    >
                      {msgItem.username}
                    </Text>
                    <Text
                      style={{
                        color: Colors["primary-white"],
                        fontFamily: "Montserrat-Medium",
                        fontSize: normalize(16),
                      }}
                    >
                      {msgItem.message}
                    </Text>
                  </View>
                )}
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
              fontSize: normalize(19),
              textAlign: "center",
              color: Colors["primary-yellow"],
              fontFamily: "Montserrat-SemiBold",
              backgroundColor: Colors["primary-lightbg"],
              borderRadius: normalize(20),
              paddingVertical: normalize(61),
              paddingHorizontal: normalize(16),
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
