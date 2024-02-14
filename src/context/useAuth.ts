import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../firebase/FirebaseConfig";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager } from "react-native-fbsdk-next";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  const updateUserData = async (user: User) => {
    if (user?.uid) {
      const docSnap = await getDoc(doc(database, "users", user.uid));
      if (docSnap.exists()) {
        setUser({ ...user, ...docSnap.data() });
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log("userContextData:", user);
      if (user) {
        // User is signed in and authenticated
        setIsAuthenticated(true);
        await updateUserData(user);
      } else {
        // User is signed out and not authenticated
        setUser(null);
        setIsAuthenticated(false);
      }
      // setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clearing the "users state" upon logout
      setIsAuthenticated(false); // set isAuthenticated to false upon logout
      await GoogleSignin.revokeAccess(); // tilbagekalder token
      await GoogleSignin.signOut(); // signing out of google account
      await LoginManager.logOut(); //signing out of facebook
    } catch (error) {
      console.log("useAuth Error", error);
      return error;
    }
  };

  return {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };
}
