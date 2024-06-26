import React, { useContext, useEffect, useState } from 'react'
import { useMagicContext } from '../context/magic_context' // Importa el contexto de Magic

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user, isLoading, error } = useMagicContext() // Usa el contexto de Magic
  const [myUser, setMyUser] = useState(null)

  useEffect(() => {
    setMyUser(user)
  }, [user])

  return (
    <UserContext.Provider 
      value={{ loginWithRedirect, logout, myUser, isLoading, error }}
      >
      {children}
    </UserContext.Provider>
  )
}
export const useUserContext = () => {
  return useContext(UserContext)
}
