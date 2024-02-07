import { View, Text, Dimensions, ActivityIndicator, Alert } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import Colors from "../../utils/constants/Colors";
import ChatHeader from "../../components/generic/headers/ChatHeader";
import VectorIcon from "../../assets/icons/VectorIcons";
import Chat from "../../components/chat/message/Chat";
import MessageTextInput from "../../components/chat/message/MessageTextInput";
import CustomKeyBoardView from "../../components/keyboard-view/CustomKeyBoardView";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../../context/UserContext";
import { database } from "../../firebase/FirebaseConfig";
import ImagePicker from "react-native-image-crop-picker";

const ChatScreen = ({ route }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { width, height } = Dimensions.get("window");
  const [message, setMessage] = useState("");
  const { item } = route.params;
  const { user } = useAuth();

  // const handleSendChatMessage = async () => {
  //   if (!message.trim()) {
  //     Alert.alert("Message Error", "Please type something!");
  //     return;
  //   }

  //   // Loading triggered
  //   // setLoading(true);

  //   try {
  //     const currentTimeStamp = serverTimestamp();
  //     const newDoc = {
  //       timeCreated: currentTimeStamp,
  //       // timeCreated: Timestamp.fromDate(new Date()),
  //       chatroomId: item.chatroomId,
  //       message: message,
  //       userId: user?.uid,
  //       username: user?.username,
  //     };

  //     await addDoc(
  //       collection(doc(database, "chatrooms", item.chatroomId), "messages"),
  //       newDoc
  //     )
  //       .then(() => {
  //         setMessage(""); // Im clearing the messageinput after sending
  //         // setLoading(false);
  //       })
  //       .catch((error) => {
  //         // setLoading(false);
  //         console.log("message", newDoc);

  //         // Error codes er fundet på nedestående sider
  //         //https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat
  //         //https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
  //         let errorMessage = "Failed to send message. Please try again.";
  //         switch (error.code) {
  //           case "permission-denied":
  //             errorMessage =
  //               "You don't have permission to perform this action.";
  //             break;
  //           case "unavailable":
  //             errorMessage =
  //               "The service is currently unavailable. Please try again later.";
  //             break;
  //           case "resource-exhausted":
  //             errorMessage =
  //               "You've reached a service limit. Please try again later.";
  //             break;
  //           case "deadline-exceeded":
  //             errorMessage =
  //               "The request took too long to complete. Please try again.";
  //             break;
  //         }
  //         Alert.alert("Error", errorMessage);
  //         return;
  //       });
  //   } catch (error: any) {
  //     Alert.alert("Error:", error.message);
  //     return;
  //   }
  // };

  const handleSendChatMessage = async () => {
    if (!message.trim()) {
      Alert.alert("Message Error", "Please type something!");
      return;
    }

    // Loading triggered
    // setLoading(true);

    try {
      const currentTimeStamp = serverTimestamp();
      const newDoc = await addDoc(
        collection(doc(database, "chatroom", item.chatroomId), "messages"),
        {
          timeCreated: currentTimeStamp,
          // timeCreated: Timestamp.fromDate(new Date()),
          chatroomId: item.chatroomId,
          message: message,
          username: user?.username,
          userId: user?.userId,
        }
      )
        .then(() => {
          setMessage(""); // Im clearing the messageinput after sending
          // setLoading(false);
        })
        .catch((error) => {
          // setLoading(false);
          console.log("message", newDoc);

          // Error codes er fundet på nedestående sider
          //https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat
          //https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
          let errorMessage = "Failed to send message. Please try again.";
          switch (error.code) {
            case "permission-denied":
              errorMessage =
                "You don't have permission to perform this action.";
              break;
            case "unavailable":
              errorMessage =
                "The service is currently unavailable. Please try again later.";
              break;
            case "resource-exhausted":
              errorMessage =
                "You've reached a service limit. Please try again later.";
              break;
            case "deadline-exceeded":
              errorMessage =
                "The request took too long to complete. Please try again.";
              break;
          }
          Alert.alert("Error", errorMessage);
          return;
        });
    } catch (error: any) {
      Alert.alert("Error:", error.message);
      return;
    }
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      console.log(images);
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors["primary-darkbg"] }}>
        <ActivityIndicator
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              marginTop: height * 0.45,
            },
          ]}
          size="large"
          color={Colors["primary-yellow"]}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors["primary-darkbg"] }}>
      <View style={{ marginTop: height * 0.035 }}>
        <ChatHeader
          iconLeft={
            <VectorIcon
              type={"Ionicons"}
              name="chevron-back"
              color={Colors["primary-white"]}
              size={26}
            />
          }
          title={item.chatname}
          iconRight={
            <VectorIcon
              type={"Ionicons"}
              name="ellipsis-horizontal"
              color={Colors["primary-white"]}
              size={26}
            />
          }
        />
      </View>
      <View style={{ marginTop: height * 0.09, flex: 1 }}>
        {/* <Chat route={route} /> */}
      </View>
      <View style={{ paddingTop: 4 }}>
        <MessageTextInput
          onPress={handleSendChatMessage}
          value={message}
          changeCallback={setMessage}
          style={{
            color: Colors["primary-white"],
            fontFamily: "Montserrat-Medium",
            fontSize: 14,
            width: width * 0.6,
            textAlign: "left",
          }}
          iconLeft={
            <VectorIcon
              type={"Ionicons"}
              name="image-outline"
              color={Colors["primary-black"]}
              size={24}
              onPress={uploadImage}
            />
          }
          placeholder="Message"
          placeholderTextColor={Colors["primary-medium-grey"]}
          iconRight={
            <VectorIcon
              type={"Ionicons"}
              name="send-outline"
              color={Colors["primary-iconbg-grey"]}
              size={22}
              // onPress={handleSendChatMessage}
            />
          }
        />
      </View>
    </View>
  );
};

export default ChatScreen;
