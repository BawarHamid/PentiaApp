import { ReactNode, createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, database } from "../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext({});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  const login = async (email, password) => {
    try {
    } catch (error) {}
  };

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("res.user", res.user);

      // using setDoc instead of addDoc so i can set the uuid from authenticated user to userId for this collection
      await setDoc(doc(database, "users", res.user.uid), {
        username,
        userId: res.user.uid,
      });
      return { success: true, data: res.user };
    } catch (error: any) {
      return { success: false, errMsg: error.message };
    }
  };

  const logout = async () => {
    try {
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default UserContext;
