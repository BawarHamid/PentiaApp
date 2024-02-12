import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { database } from "../../firebase/FirebaseConfig";

const getChatRoomMessages = useCallback(
  async (messages: []) => {
    const messageQuery = query(
      collection(database, "chatrooms", item.chatroomId, "messages"),
      // Fetching the from the "newest" value
      orderBy("timeCreated", "asc")
    );

    const unsub = onSnapshot(messageQuery, (querySnapshot) => {
      const allMessages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(allMessages);
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
  },
  [messages]
);
