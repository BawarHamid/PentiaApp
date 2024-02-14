import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import React, { useEffect } from "react";
import RootNavigator from "./src/router/RootNavigator";
import Colors from "./src/utils/constants/Colors";
import { MenuProvider } from "react-native-popup-menu";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { AuthProvider } from "./src/context/AuthContext";
GoogleSignin.configure({
  webClientId:
    "830333589171-s2u18mfr5mbr7h5h7o4e5u9nh6vj4f9o.apps.googleusercontent.com",
});

const App: React.FC = () => {
  return (
    <MenuProvider>
      {/* <AuthProvider> */}
      <StatusBar backgroundColor={Colors["primary-medium-black"]} />
      <RootNavigator />
      {/* </AuthProvider> */}
    </MenuProvider>
  );
};

export default App;
