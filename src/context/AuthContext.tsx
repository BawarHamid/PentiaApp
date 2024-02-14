// import {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, database } from "../firebase/FirebaseConfig";

// type AuthContextProps = {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   isAuthenticated: boolean | undefined;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
//     undefined
//   );

//   const updateUserData = async (user: User) => {
//     if (user?.uid) {
//       const docSnap = await getDoc(doc(database, "users", user.uid));
//       if (docSnap.exists()) {
//         // console.log("contextData2", docSnap.data());
//         setUser({ ...user, ...docSnap.data() });
//       }
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       console.log("userContextData:", user);

//       if (user) {
//         // User is signed in and authenticated
//         setIsAuthenticated(true);
//         await updateUserData(user); // Ensure updateUserData is defined before calling it
//       } else {
//         // User is signed out and not authenticated
//         setUser(null);
//         setIsAuthenticated(false);
//       }
//       // setIsLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = async () => {
//     try {
//       await auth.signOut();
//       setUser(null); // Clear user state upon logout
//       setIsAuthenticated(false); // Set isAuthenticated to false upon logout
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         isAuthenticated,
//         setIsAuthenticated,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = (): AuthContextProps => useContext(AuthContext);
