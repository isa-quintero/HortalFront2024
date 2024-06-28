import React, { useContext, useEffect, useState } from 'react'
import { useMagicContext } from '../context/magic_context'

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user, isLoading, error } = useMagicContext(); // Usa el contexto de Magic
  const [myUser, setMyUser] = useState(null)

  useEffect(() => {
    setMyUser(user); // Actualiza el estado de myUser cuando cambia el usuario en Magic
  }, [user])

  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        myUser,
        isLoading,
        error,
        isAuthenticated: !!myUser // Agrega una propiedad para verificar si el usuario está autenticado
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext); // Hook personalizado para acceder al contexto de usuario
}
