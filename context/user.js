import { createContext, useContext } from 'react';
import { useUserData } from '../hooks/useUserData';

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const userData = useUserData();
  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
}
