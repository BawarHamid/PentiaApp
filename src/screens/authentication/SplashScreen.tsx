import { View, Text } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
// import { useAuth } from "../../context/UserContext";
import { Dimensions } from "react-native";
import { defaultStyles } from "../../utils/constants/Styles";
import { useAuth } from "../../context/useAuth";
// import { useAuth } from "../../context/AuthContext";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigation.navigate("ChatRoom" as never);
      } else {
        navigation.navigate("Login" as never);
      }
    }, 2600);

    return () => clearTimeout(timer);
  }, [user, navigation]);

  return (
    <View
      style={[
        defaultStyles.containerDarkTheme,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <LottieView
        source={
          user
            ? require("../../assets/Animations/SplashScreen/SplashLoading.json")
            : require("../../assets/Animations/SplashScreen/SplashAnimation.json")
        }
        autoPlay
        loop
        resizeMode="cover"
        style={{ width: width * 0.4, height: height * 0.4 }}
      />
    </View>
  );
};

export default SplashScreen;
