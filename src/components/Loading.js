import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <FaSpinner className="fa-spin spinner-animation" style={{ fontSize: '3rem' }} />
    </div>
  );
};

export default Loading;
