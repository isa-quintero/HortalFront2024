import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMagicContext } from '../context/magic_context';
import { useUserContext } from '../context/user_context';
import { url_back } from '../utils/constants';

const RedirectLogic = () => {
  const { user, getRedirectResult } = useMagicContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRegistered = async () => {
      try {
        const url = `${url_back}profiles/users-emails/${user.email}`;
        const response = await axios.get(url);

        if (myUser && !myUser.role) {
          console.log('Usuario no registrado');
          navigate('/register');
        } else {
          console.log('Usuario  registrado');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking user registration:', error);
      } finally {
        setLoading(false);
      }
    };

    getRedirectResult();
    if (myUser) {
      checkUserRegistered();
    }
  }, [user, myUser, getRedirectResult, navigate]);

  // Mostrar un indicador de carga mientras se está cargando
  return loading ? <div>Cargando...</div> : null;
};

export default RedirectLogic;
