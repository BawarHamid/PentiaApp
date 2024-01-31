import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/authentication/SplashScreen";
const Stack = createNativeStackNavigator();

const IsAuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "All Chats is displayed here",
        }}
      />
    </Stack.Navigator>
  );
};

export default IsAuthStack;
