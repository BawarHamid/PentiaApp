import { View, Text } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { defaultStyles } from "../../utils/constants/Styles";
import { useAuth } from "../../context/useAuth";
import normalize from "react-native-normalize";

const SplashScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigation.navigate("chat-room" as never);
      } else {
        navigation.navigate("social-login" as never);
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
        style={{ width: normalize(320), height: normalize(320) }}
      />
    </View>
  );
};

export default SplashScreen;
