import { SafeAreaView, StatusBar, View } from "react-native";
import React from "react";
import AppNavigator from "./src/router/AppNavigator";
import { UserContextProvider } from "./src/context/UserContext";
import Colors from "./src/constants/Colors";
import { defaultStyles } from "./src/constants/Styles";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <StatusBar backgroundColor={Colors["primary-medium-black"]} />
      <View style={defaultStyles.container}>
        <AppNavigator />
      </View>
    </UserContextProvider>
  );
};

export default App;
