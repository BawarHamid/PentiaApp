import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import AppNavigator from "./src/router/AppNavigator";
import { UserContextProvider } from "./src/context/UserContext";
import Colors from "./src/constants/Colors";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <SafeAreaView className="bg-primary-bgcolor flex-1">
        <StatusBar backgroundColor={Colors["primary-medium-black"]} />

        <AppNavigator />
      </SafeAreaView>
    </UserContextProvider>
  );
};

export default App;
