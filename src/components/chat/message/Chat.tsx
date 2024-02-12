import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Colors from "../../../utils/constants/Colors";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../../../firebase/FirebaseConfig";

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { item } = route.params;
  const { width, height } = Dimensions.get("window");
  // console.log("chatroom Info:", item);

  const getChatRoomMessages = useCallback(async () => {
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
    });
    // needs to be cleared as the component unmounts
    return () => unsub();
  }, []);

  useEffect(() => {
    getChatRoomMessages();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getChatRoomMessages();
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

  console.log("this chats messages:", messages);
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}></Text>
    </View>
  );
};

export default Chat;
