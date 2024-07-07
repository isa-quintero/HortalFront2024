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

        // Promesa para verificar si el usuario está registrado como cliente
        const customerPromise = axios.get(`${url_back}profiles/customers-emails/${user.email}`);

        // Promesa para verificar si el usuario está registrado como asociación
        const associationPromise = axios.get(`${url_back}profiles/associations-emails/${user.email}`);

        // Promesa para verificar si el usuario está registrado como agricultor
        const farmerPromise = axios.get(`${url_back}profiles/farmers-emails/${user.email}`);

        // Esperar todas las promesas
        const [customerResponse, associationResponse, farmerResponse] = await Promise.all([
          customerPromise,
          associationPromise,
          farmerPromise,
        ]);

        // Verificar si el usuario está registrado como cliente
        const isCustomer = customerResponse.data.exists;

        // Verificar si el usuario está registrado como asociación
        const isAssociation = associationResponse.data.exists;

        // Verificar si el usuario está registrado como agricultor
        const isFarmer = farmerResponse.data.exists;

        // Si cualquiera de los roles está registrado, establecer isUserRegistered como true
        setIsUserRegistered(isCustomer || isAssociation || isFarmer);
      } catch (error) {
        console.error('Error checking user registration:', error);
        setIsUserRegistered(false); // Manejo de error: asumir que el usuario no está registrado
      }
    };

    if (user) {
      checkUserRegistered();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Verificar si la ruta actual es la de registro
  const isRegisterRoute = window.location.pathname === '/register';

  // Verificar si el usuario está autenticado y tiene un rol permitido, o si es la ruta de registro o está registrado
  const isAllowed = isRegisterRoute || (myUser && allowedRoles.includes(myUser.role)) || isUserRegistered;

  return isAllowed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
