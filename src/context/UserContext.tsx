import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator } from "react-native";
import Colors from "../utils/constants/Colors";
import { auth, database } from "../firebase/FirebaseConfig";
import { defaultStyles } from "../utils/constants/Styles";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext({});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  const updateUserData = async (user: User) => {
    if (user?.uid) {
      const docSnap = await getDoc(doc(database, "users", user.uid));
      if (docSnap.exists()) {
        // console.log("contextData2", docSnap.data());
        setUser({ ...user, ...docSnap.data() });
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("userContextData:", user);

      if (user) {
        // User is signed in and authenticated
        setIsAuthenticated(true);
        await updateUserData(user); // Ensure updateUserData is defined before calling it
      } else {
        // User is signed out and not authenticated
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // A loading indicator is triggered, while waiting for auth state
    return (
      <ActivityIndicator
        style={[
          defaultStyles.containerLightTheme,
          { alignItems: "center", justifyContent: "center" },
        ]}
        size="large"
        color={Colors["primary-cyan"]}
      />
    );
  }

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default UserContext;
