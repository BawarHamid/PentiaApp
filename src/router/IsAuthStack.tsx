import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatRoomScreen from "../screens/chat/ChatRoomScreen";
import SplashScreen from "../screens/authentication/SplashScreen";
const Stack = createNativeStackNavigator();

const IsAuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />

      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{
          // headerShown: true,
          headerTitle: "All Chats is displayed here",
          animation: "fade",
          animationDuration: 300,
        }}
      />
    </Stack.Navigator>
  );
};

export default IsAuthStack;
