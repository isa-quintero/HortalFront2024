// Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import magic from '../magic'; // Import Magic instance

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      try {
        const result = await magic.oauth.getRedirectResult();
        console.log('User:', result.magic.userMetadata);
        navigate('/'); // Redirige a la ruta deseada después del login
      } catch (error) {
        console.error('Error completing login:', error);
      }
    };

    finishLogin();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
