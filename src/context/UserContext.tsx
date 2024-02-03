import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ActivityIndicator } from "react-native";
import Colors from "../utils/constants/Colors";
import { auth, database } from "../firebase/FirebaseConfig";

const UserContext = createContext({});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in and authenticated
        setUser(user);
        setIsAuthenticated(true);
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
    // This will render a loading indicator while waiting for auth state
    return <ActivityIndicator size="large" color={Colors["primary-cyan"]} />;
  }

  // const login = async (email, password) => {
  //   try {
  //   } catch (error) {}
  // };

  // begge virker ikke
  // const register = async (
  //   email: string,
  //   password: string,
  //   username: string
  // ) => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password).then(
  //       (userCred) => {
  //         const data = {
  //           username: username,
  //           userId: userCred.user.uid,
  //         };

  //         setDoc(doc(database, "users", userCred.user.uid), data)
  //           .then(() => ({ success: true, data: userCred.user }))
  //           .catch((error) => ({ success: false, errMsg: error.message }));
  //       }
  //     );
  //   } catch (error: any) {
  //     console.error("Firebase Auth Error:", error.message);
  //     return { success: false, errMsg: error.message };
  //   }
  // };

  // const register = async (
  //   email: string,
  //   password: string,
  //   username: string
  // ) => {
  //   try {
  //     const res = await createUserWithEmailAndPassword(auth, email, password);

  //     await setDoc(doc(database, "users", res.user.uid), {
  //       username,
  //       userId: res.user.uid,
  //     });

  //     return { success: true, data: res.user };
  //   } catch (error: any) {
  //     console.error("Firebase Auth Error:", error.message);
  //     return { success: false, errMsg: error.message };
  //   }
  // };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        // login,
        logout,
        // register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default UserContext;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
