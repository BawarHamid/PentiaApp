import { NavigationContainer } from "@react-navigation/native";
import IsAuthedStack from "./IsAuthedStack";
import IsNotAuthedStack from "./IsNotAuthedStack";
import { useAuth } from "../context/useAuth";

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <IsAuthedStack /> : <IsNotAuthedStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
