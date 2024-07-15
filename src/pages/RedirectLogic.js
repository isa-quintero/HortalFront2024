import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';
import { useUserContext } from '../context/user_context';
import { Loading } from '../components';

const RedirectLogic = () => {
  const { user, getRedirectResult } = useMagicContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRegistered = async () => {
      try {

        console.log(myUser)
        console.log(myUser.role)
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

  return loading ? (
    <Loading />
  ) : null;
};

export default RedirectLogic;
