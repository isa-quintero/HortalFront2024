import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';
import { useUserContext } from '../context/user_context'

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isLoading } = useMagicContext();
  const { myUser } = useUserContext();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Verifica si la ruta actual es la de registro
  const isRegisterRoute = window.location.pathname === '/register';

  // Verifica si el usuario está autenticado y tiene un rol permitido, o si es la ruta de registro
  const isAllowed = isRegisterRoute || (myUser && allowedRoles.includes(myUser.role));

  return isAllowed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
