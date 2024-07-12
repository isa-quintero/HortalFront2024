import React, { useContext, useEffect, useState } from 'react';
import { useMagicContext } from '../context/magic_context';
import axios from 'axios';
import { url_back } from '../utils/constants';

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user, isLoading, error } = useMagicContext();
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const url = `${url_back}profiles/users-emails/${user.email}`;
          const response = await axios.get(url);

          if (response.data && response.data.userType) {
            setMyUser({ ...user, role: response.data.userType });
          } else {
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
