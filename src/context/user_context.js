import React, { useContext, useEffect, useState } from 'react'
import { useMagicContext } from '../context/magic_context'
import axios from 'axios'
import { url_back } from '../utils/constants';

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user, isLoading, error } = useMagicContext();
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const urls = [
            `${url_back}profiles/customers-emails/${user.email}`,
            `${url_back}profiles/associations-emails/${user.email}`,
            `${url_back}profiles/farmers-emails/${user.email}`
          ];

          const responses = await Promise.allSettled(urls.map(url => axios.get(url)));

          for (const response of responses) {
            if (response.status === 'fulfilled' && response.value.data) {
              const userData = response.value.data;
              setMyUser({ ...user, role: userData.userType});
              break;
            }
          }

          // Si ninguna de las solicitudes se resolvió con datos válidos
          if (!myUser) {
            console.error('User role not found.');
          }
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
