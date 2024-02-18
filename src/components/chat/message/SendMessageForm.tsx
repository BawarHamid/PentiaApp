import { View, Alert, Keyboard } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../context/useAuth";
import LottieView from "lottie-react-native";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { database } from "../../../firebase/FirebaseConfig";
import MessageTextInput from "./MessageTextInput";
import Colors from "../../../utils/constants/Colors";
import VectorIcon from "../../../assets/icons/VectorIcons";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import normalize from "react-native-normalize";

const SendMessageForm = ({ route }) => {
  const { item } = route.params;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const handleSendMessage = async () => {
    if (!message.trim()) {
      Alert.alert("Message Error", "Please type something!");
      return;
    }
    // Loading triggered
    setLoading(true);
    try {
      addDoc(
        collection(doc(database, "chatrooms", item.chatroomId), "messages"),
        {
          username: user?.username,
          message: message, //Message text
          timeCreated: Timestamp.fromDate(new Date()), //Message date.
          chatroomId: item.chatroomId, //sets the chatroomId from the entered chatroom.
          userId: user?.uid, //using users uid as userId ref
          profile_picture: user?.photoURL, //using users photoURL from social login as profile pic if there is one.
        }
      )
        .then(() => {
          setMessage(""); // Im clearing the messageinput after sending
          Keyboard.dismiss(); // closing the keyboard after sending the message.
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
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
          console.log("ChatScreen Error:", error);
          return;
        });
    } catch (error) {
      Alert.alert("Messagesender error:", String(error));
      setLoading(false);
      console.log(error);
      return;
    }
  };

  const uploadImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: false,
      });
      console.log(image);
      let imageName = image.path.substring(image.path.lastIndexOf("/") + 1);
      let ext = imageName.split(".").pop();
      let name = imageName.split(".")[0];
      let newImageName = name + Date.now() + "." + ext;
      const storageRef = storage().ref(`chat_images/${newImageName}`);
      await storageRef.putFile(image.path);
      const imgUrl = await storage()
        .ref(`chat_images/${newImageName}`)
        .getDownloadURL();

      addDoc(
        collection(doc(database, "chatrooms", item.chatroomId), "messages"),
        {
          username: user?.username,
          message: imgUrl,
          timeCreated: Timestamp.fromDate(new Date()),
          chatroomId: item.chatroomId,
          userId: user?.uid,
          profile_picture: user?.photoURL,
        }
      )
        .then()
        .catch((error) => {
          setLoading(false);
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
          Alert.alert("Message Error:", errorMessage);
          console.log("Message Error:", error);
          return;
        });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <View>
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LottieView
            source={require("../../../assets/Animations/Loadings/LoadingAnimation1.json")}
            autoPlay
            loop
            resizeMode="cover"
            style={{
              width: normalize(81),
              height: normalize(81),
              alignItems: "center",
            }}
          />
        </View>
      ) : (
        <MessageTextInput
          // disabled={!message}
          onPress={handleSendMessage}
          value={message}
          changeCallback={setMessage}
          style={{
            color: Colors["primary-white"],
            fontFamily: "Montserrat-Medium",
            fontSize: normalize(16),
            width: normalize(226.5),
            textAlign: "left",
          }}
          iconLeft={
            <VectorIcon
              type={"Ionicons"}
              name="image-outline"
              color={Colors["primary-black"]}
              size={normalize(25)}
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
              size={normalize(25)}
            />
          }
        />
      )}
    </View>
  );
};

export default SendMessageForm;
