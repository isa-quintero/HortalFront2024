// OAuthLogin.js
import React from 'react';
import { useMagicContext } from '../context/magic_context'; // Import Magic context

const OAuthLogin = () => {
  const { login } = useMagicContext();

  const handleLogin = () => {
    login('google'); // Replace 'google' with your desired provider
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default OAuthLogin;
