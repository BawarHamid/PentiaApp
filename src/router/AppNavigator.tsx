import { View, Text, StatusBar, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "../constants/Colors";
import SplashScreen from "../screens/authentication/SplashScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import IsAuthStack from "./IsAuthStack";
import IsNotAuthStack from "./IsNotAuthStack";
import { useAuth } from "../context/UserContext";

const AppNavigator = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors["primary-grey"]} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <IsAuthStack /> : <IsNotAuthStack />}
      {/* {user ? <IsNotAuthStack /> : <IsAuthStack />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;
