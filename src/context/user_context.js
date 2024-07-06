import React, { useContext, useEffect, useState } from 'react'
import { useMagicContext } from '../context/magic_context'
import axios from 'axios'; // Importa axios para hacer la llamada a la API
import { url_back } from '../utils/constants';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user, isLoading, error } = useMagicContext();
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          //const response = await axios.get(`${url_back}/profiles/user/${user.email}`); // Ajusta la URL según tu API
          //const userData = response.data;
          setMyUser({ ...user, role: "FARMER" });
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        myUser,
        isLoading,
        error,
        isAuthenticated: !!myUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
