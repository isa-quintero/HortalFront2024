import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';
import { useUserContext } from '../context/user_context';
import { Loading } from '../components';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoading: magicLoading } = useMagicContext();
  const { myUser, isLoading: userLoading } = useUserContext();

  if (magicLoading || userLoading) {
    return <Loading />;
  }

  // Verificar si el usuario está autenticado y tiene un rol permitido
  const isAuthenticated = user && myUser && allowedRoles.includes(myUser.role);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
