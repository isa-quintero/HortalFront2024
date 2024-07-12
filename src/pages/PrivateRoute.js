import React, { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isLoading, user } = useMagicContext();
  const { myUser } = useUserContext();
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const checkUserRegistered = async () => {
      if (user) {
        // Aquí puedes realizar la lógica adicional para verificar si el usuario está registrado
        setIsUserRegistered(true);
      }
    };

    checkUserRegistered();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Mostrar un indicador de carga mientras se verifica el estado de autenticación
  }

  if (!isUserRegistered) {
    // Redirigir si el usuario no está registrado
    return <Navigate to="/" />;
  }

  // Verificar si la ruta actual es la de validación y si el usuario está autenticado
  if (rest.path === '/validate') {
    if (!user) {
      // Si el usuario no está autenticado, redirigir a la pantalla de inicio o mostrar un mensaje de error
      return <Navigate to="/" />;
    }
  }

  // Renderizar la ruta protegida solo si el usuario está autenticado y registrado
  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
