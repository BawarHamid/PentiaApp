import { SafeAreaView, StatusBar, View } from "react-native";
import React from "react";
import AppNavigator from "./src/router/AppNavigator";
import { UserContextProvider } from "./src/context/UserContext";
import Colors from "./src/utils/constants/Colors";
import { defaultStyles } from "./src/utils/constants/Styles";
import { MenuProvider } from "react-native-popup-menu";

const App: React.FC = () => {
  return (
    <MenuProvider>
      <UserContextProvider>
        <StatusBar backgroundColor={Colors["primary-medium-black"]} />
        <AppNavigator />
      </UserContextProvider>
    </MenuProvider>
  );
};

export default App;
