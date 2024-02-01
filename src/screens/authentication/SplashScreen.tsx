import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/UserContext";
import { Dimensions } from "react-native";
import { defaultStyles } from "../../constants/Styles";
const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const { user } = useAuth();
  // const { navigate } = useNavigation();
  const navigtion = useNavigation();

  setTimeout(() => {
    {
      // user ? navigate("Home" as never) : navigate("Login" as never);
      user
        ? navigtion.navigate("ChatRoom" as never)
        : navigtion.navigate("Login" as never);
    }
  }, 2700);

  return (
    <View
      style={[
        defaultStyles.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <LottieView
        source={require("../../assets/Animations/SplashAnimation.json")}
        autoPlay
        loop
        resizeMode="cover"
        style={{ width: width * 0.6, height: height * 0.6 }}
      />
    </View>
  );
};

export default SplashScreen;
