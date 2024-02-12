import { View, Text } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/UserContext";
import { Dimensions } from "react-native";
import { defaultStyles } from "../../utils/constants/Styles";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      user
        ? navigation.navigate("ChatRoom" as never)
        : navigation.navigate("Login" as never);
    }, 2600);

    return () => clearTimeout(timer);
  }, [user, navigation]);

  return (
    <View
      style={[
        defaultStyles.containerLightTheme,
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
