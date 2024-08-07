import React, { createContext, useContext, useEffect, useState } from 'react';
import magic from '../magic';

const MagicContext = createContext();

export const MagicProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email,setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          const userMetadata = await magic.user.getMetadata();
          setEmail(userMetadata.email);
          setUser(userMetadata);
        }
      } catch (error) {
        console.error('Error checking user login status', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (provider) => {
    console.log('Login called with provider:', provider);
    try {
      await magic.oauth.loginWithRedirect({
        provider,
        redirectURI: `${window.location.origin}/validate`, 
      });
    } catch (error) {
      console.error('Error during loginWithRedirect:', error);
    }
  };

  const getRedirectResult = async () => {
    try {
      const result = await magic.oauth.getRedirectResult();
      const userMetadata = await magic.user.getMetadata();
      setUser(userMetadata);
    } catch (error) {
      console.error('Error during getRedirectResult:', error);
    }
  };

  const logout = async () => {
    await magic.user.logout();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <MagicContext.Provider value={{ user, login, getRedirectResult, logout, isLoading }}>
      {children}
    </MagicContext.Provider>
  );
};

export const useMagicContext = () => {
  return useContext(MagicContext);
};
