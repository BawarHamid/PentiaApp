import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/authentication/LoginScreen";
import SplashScreen from "../screens/authentication/SplashScreen";

const Stack = createNativeStackNavigator();

const IsNotAuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default IsNotAuthStack;
