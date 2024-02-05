import { NavigationContainer } from "@react-navigation/native";
import IsAuthStack from "./IsAuthStack";
import IsNotAuthStack from "./IsNotAuthStack";
import { useAuth } from "../context/UserContext";

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <IsAuthStack /> : <IsNotAuthStack />}
      {/* {isAuthenticated ? <IsNotAuthStack /> : <IsAuthStack />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;
