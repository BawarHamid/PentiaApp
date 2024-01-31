import { ReactNode, createContext, useContext, useState } from "react";

// export function UserContextProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export const useAuth = () => useContext(UserContext);

const UserContext = createContext({});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default UserContext;
