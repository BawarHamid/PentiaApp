// const getChatRoomMessages = useCallback(async () => {
//   if (!refreshing) {
//     // Only show the loading indicator if not already refreshing
//     setLoading(true);
//   }

//   const messageQuery = query(
//     collection(database, "chatrooms", item.chatroomId, "messages"),
//     // Fetching the from the "newest" value
//     orderBy("timeCreated", "asc")
//   );

//   const unsub = onSnapshot(messageQuery, (querySnapshot) => {
//     const allMessages = querySnapshot.docs.map((doc) => doc.data());
//     setMessages(allMessages);
//     setRefreshing(false);
//     setLoading(false);
//   });
//   // needs to be cleared as the component unmounts
//   return () => unsub();
// }, []);

useEffect(() => {
  const getChatRoomMessages = async () => {
    if (!refreshing) {
      // Only show the loading indicator if not already refreshing
      setLoading(true);
    }

    const messageQuery = query(
      collection(database, "chatrooms", item.chatroomId, "messages"),
      // Fetching the from the "newest" value
      orderBy("timeCreated", "asc")
    );

    const unsub = onSnapshot(messageQuery, (querySnapshot) => {
      const allMessages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(allMessages);
      setRefreshing(false);
      setLoading(false);
      // Scroll to the latest message
      if (listRef.current) {
        setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
      }
    });
    // needs to be cleared as the component unmounts
    return () => unsub();
  };

  getChatRoomMessages();
}, [refreshing]);

// useEffect(() => {
//   getChatRoomMessages();
// }, []);

useEffect(() => {
  if (messages.length > 0 && listRef.current) {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }
}, [messages]);

const onRefresh = () => {
  setRefreshing(true);
  getChatRoomMessages();
};

// const getChatRoomMessages = useCallback(async () => {
//   const messageQuery = query(
//     collection(database, "chatrooms", item.chatroomId, "messages"),
//     // Fetching the from the "newest" value
//     orderBy("timeCreated", "asc")
//   );

//   const unsub = onSnapshot(messageQuery, (querySnapshot) => {
//     const allMessages = querySnapshot.docs.map((doc) => doc.data());
//     setMessages(allMessages);
//     setLoading(false);

//     if (listRef.current) {
//       setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 800); // Note the 'animated: false'
//     }
//   });
//   // needs to be cleared as the component unmounts
//   return () => unsub();
// }, []);

// useEffect(() => {
//   getChatRoomMessages();
// }, []);

// useEffect(() => {
//   if (messages.length > 0 && listRef.current) {
//     setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
//   }
// }, [messages]); // Reacts to changes in the messages array

import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ListRenderItem,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { User } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../../firebase/FirebaseConfig";
import Colors from "../../../utils/constants/Colors";
import { useAuth } from "../../../context/UserContext";
import VectorIcon from "../../../assets/icons/VectorIcons";

// type MessageProps = {
//   message?: string;
//   loggedInUser?: User;
// };

const Message = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { item } = route.params;
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState < boolean > true;
  const listRef = useRef < FlatList > null;
  const { user } = useAuth();

  const getChatRoomMessages = useCallback(async () => {
    const messageQuery = query(
      collection(database, "chatrooms", item.chatroomId, "messages"),
      // Fetching the from the "newest" value
      orderBy("timeCreated", "asc")
    );

    const unsub = onSnapshot(messageQuery, (querySnapshot) => {
      const allMessages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(allMessages);
      setLoading(false);

      if (listRef.current) {
        setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 800); // Note the 'animated: false'
      }
    });
    // needs to be cleared as the component unmounts
    return () => unsub();
  }, []);

  useEffect(() => {
    getChatRoomMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && listRef.current) {
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]); // Reacts to changes in the messages array

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

  const renderChatItem: ListRenderItem<any> = ({ item }) => (
    <View style={{ marginVertical: 8 }}>
      {user?.userId === item.userId ? (
        // this is what the logged-in user see
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 10,
          }}
        >
          {/* Chat bubble - you */}
          <View
            style={{
              maxWidth: "80%", // Prevents the bubble from taking up the full width
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
              {item.message}
            </Text>
          </View>
        </View>
      ) : (
        // this is what the receiver see
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end", // Keeps items aligned at the bottom
            marginLeft: 10, // Adjust as needed
          }}
        >
          <VectorIcon
            type={"Ionicons"}
            name="person-circle-outline"
            color={Colors["primary-messagebg-grey"]}
            size={34}
            style={{ marginRight: 8 }} // Space between icon and message
          />

          {/* Chat bubble - receiver */}
          <View
            style={{
              maxWidth: "80%", // Allows some space for the icon on the left
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
                marginBottom: 4, // Space between username and message text
              }}
            >
              {item.username}
            </Text>
            <Text
              style={{
                color: Colors["primary-white"],
                fontFamily: "Montserrat-Medium",
                fontSize: 14,
              }}
            >
              {item.message}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      ref={listRef}
      data={messages}
      renderItem={renderChatItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
    />
  );
};

export default Message;
