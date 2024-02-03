import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import IsAuthStack from "./IsAuthStack";
import IsNotAuthStack from "./IsNotAuthStack";
import { useAuth } from "../context/UserContext";
import Colors from "../utils/constants/Colors";
import { ActivityIndicator } from "react-native";

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in and authenticated
  //       setUser(user);
  //       setIsAuthenticated(true);
  //     } else {
  //       // User is signed out and not authenticated
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     }
  //     setIsLoading(false);
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  // if (isLoading) {
  //   // This will render a loading indicator while waiting for auth state
  // return <ActivityIndicator size="large" color={Colors["primary-cyan"]} />;
  // }

  return (
    <NavigationContainer>
      {isAuthenticated ? <IsAuthStack /> : <IsNotAuthStack />}
      {/* {isAuthenticated ? <IsNotAuthStack /> : <IsAuthStack />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;
