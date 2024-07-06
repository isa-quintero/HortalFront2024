import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useMagicContext } from '../context/magic_context';
import { useUserContext } from '../context/user_context';
import { url_back } from '../utils/constants';


const PrivateRoute = ({ children, allowedRoles }) => {
  const { isLoading, user } = useMagicContext();
  const { myUser } = useUserContext();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    const checkUserRegistered = async () => {
      try {
        //const encodedEmail = encodeURIComponent(user.email);
        const response = await axios.get(`${url_back}customer-email/${user.email}`);
        setIsUserRegistered(response.data.exists); // Suponiendo que response.data.exists indica si el usuario existe
      } catch (error) {
        console.error('Error checking user registration:', error);
        setIsUserRegistered(false); // Manejo de error: asumimos que el usuario no está registrado
      }
    };

    if (user) {
      checkUserRegistered();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Verifica si la ruta actual es la de registro
  const isRegisterRoute = window.location.pathname === '/register';

  // Verifica si el usuario está autenticado y tiene un rol permitido, o si es la ruta de registro o está registrado
  const isAllowed = isRegisterRoute || (myUser && allowedRoles.includes(myUser.role)) || isUserRegistered;

  return isAllowed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
