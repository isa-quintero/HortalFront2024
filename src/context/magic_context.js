// magic_context.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import magic from '../magic'; // Importa la instancia de Magic

const MagicContext = createContext();

export const MagicProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          const userMetadata = await magic.user.getMetadata();
          setUser(userMetadata);
        }
      } catch (error) {
        console.error('Error checking user login status', error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleRedirectResult = async () => {
      try {
        const result = await magic.oauth.getRedirectResult();
        if (result.magic.idToken) {
          const userMetadata = await magic.user.getMetadata();
          setUser(userMetadata);
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (window.location.search.includes('provider')) {
      handleRedirectResult();
    } else {
      checkUser();
    }
  }, []);

  const login = async (provider) => {
    try {
      await magic.oauth.loginWithRedirect({
        provider,
        redirectURI: `${window.location.origin}/register`,
      });
    } catch (error) {
      console.error('Error during loginWithRedirect:', error);
    }
  };

  const logout = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      window.location.href = '/'; // Redirige a la ruta raíz (localhost:3000)
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <MagicContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </MagicContext.Provider>
  );
};

export const useMagicContext = () => {
  return useContext(MagicContext);
};
