import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/authentication/LoginScreen";
import SplashScreen from "../screens/authentication/SplashScreen";
import RegisterScreen from "../screens/authentication/RegisterScreen";
import SocialWelcomeScreen from "../screens/authentication/SocialWelcomeScreen";

const Stack = createNativeStackNavigator();

const IsNotAuthedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />

      <Stack.Screen
        name="social-login"
        component={SocialWelcomeScreen}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
};

export default IsNotAuthedStack;
