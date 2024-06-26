import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useMagicContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
