import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/UserContext";

const SplashScreen = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  setTimeout(() => {
    {
      user ? navigate("Home" as never) : navigate("Login" as never);
    }
  }, 2700);

  return (
    <View className="flex-1 items-center justify-center">
      <LottieView
        source={require("../../assets/Animations/SplashAnimation.json")}
        autoPlay
        loop
        resizeMode="cover"
        style={{ width: 500, height: 500 }}
      />
    </View>
  );
};

export default SplashScreen;
