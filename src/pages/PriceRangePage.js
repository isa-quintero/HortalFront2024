import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';
import CreatePriceRange from '../components/CreatePriceRange';

const PriceRangePage = () => {
  const { setUser } = useMagicContext();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    console.log('Datos del formulario:', data);

    const updatedUser = { ...data, role: data.role, city: data.city, address: data.address, phone: data.phone };
    setUser(updatedUser);

    navigate('/');
  };

  return (
    <div>
      <h1>Completa tu perfil</h1>
      <CreatePriceRange onSubmit={handleFormSubmit} />
    </div>
  );
};

export default PriceRangePage;
