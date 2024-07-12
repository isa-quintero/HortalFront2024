import React, { useEffect, useState } from 'react'
import { useMagicContext } from '../context/magic_context';
import { Loading } from '../components';

const AuthWrapper = ({ children }) => {
  const { isLoading } = useMagicContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  if (!isReady) {
    return <Loading />;
  }

  return children;
};

export default AuthWrapper
