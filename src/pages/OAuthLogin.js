import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context'; // Import Magic context

const OAuthLogin = () => {
  const { login } = useMagicContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login('google'); // Replace 'google' with your desired provider
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button className='btn hero-btn' onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default OAuthLogin;
